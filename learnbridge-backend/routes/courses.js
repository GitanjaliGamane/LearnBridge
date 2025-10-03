const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email')
      .populate('students', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private (teachers only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can create courses' });
    }

    const { title, description, subject, schedule, maxStudents, price } = req.body;

    const course = new Course({
      title,
      description,
      subject,
      teacher: req.user.id,
      schedule,
      maxStudents,
      price
    });

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/courses/:id
// @desc    Update course
// @access  Private (teacher only)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the teacher of this course
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, subject, schedule, maxStudents, price, status } = req.body;

    // Update fields
    if (title) course.title = title;
    if (description) course.description = description;
    if (subject) course.subject = subject;
    if (schedule) course.schedule = schedule;
    if (maxStudents) course.maxStudents = maxStudents;
    if (price) course.price = price;
    if (status) course.status = status;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/courses/:id
// @desc    Delete course
// @access  Private (teacher only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the teacher of this course
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await course.remove();
    res.json({ message: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private (students only)
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can enroll in courses' });
    }

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is already enrolled
    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Check if course is full
    if (course.students.length >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    course.students.push(req.user.id);
    await course.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 