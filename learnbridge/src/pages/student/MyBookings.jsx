import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
  useToast,
  Link,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaVideo, 
  FaUserFriends, 
  FaStar, 
  FaCheckCircle,
  FaTimes,
  FaDownload,
  FaFileAlt,
  FaCertificate,
  FaComments,
  FaExclamationTriangle,
  FaCalendarTimes,
  FaCalendarCheck,
  FaLink,
  FaBook,
  FaGraduationCap,
  FaQuestionCircle,
} from 'react-icons/fa';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

const MyBookings = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { user } = useAuth();
  const toast = useToast();
  const { isOpen: isRescheduleOpen, onOpen: onRescheduleOpen, onClose: onRescheduleClose } = useDisclosure();
  const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure();
  const { isOpen: isRateOpen, onOpen: onRateOpen, onClose: onRateClose } = useDisclosure();
  const { isOpen: isNotesOpen, onOpen: onNotesOpen, onClose: onNotesClose } = useDisclosure();
  const { isOpen: isQuestionOpen, onOpen: onQuestionOpen, onClose: onQuestionClose } = useDisclosure();
  
  // State for selected booking
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for bookings
  useEffect(() => {
    // In a real app, this would be an API call
    const mockBookings = [
      {
        id: '1',
        tutorId: 't1',
        tutorName: 'Dr. Sarah Johnson',
        tutorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        subject: 'Mathematics',
        date: '2023-06-15T14:00:00',
        duration: 60,
        status: 'upcoming',
        sessionType: 'online',
        price: 50,
        notes: 'Please prepare questions about calculus.',
      },
      {
        id: '2',
        tutorId: 't2',
        tutorName: 'Prof. Michael Chen',
        tutorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        subject: 'Physics',
        date: '2023-06-10T10:00:00',
        duration: 90,
        status: 'completed',
        sessionType: 'in-person',
        price: 75,
        rating: 5,
        notes: 'Great session on Newton\'s laws.',
      },
      {
        id: '3',
        tutorId: 't3',
        tutorName: 'Dr. Emily Rodriguez',
        tutorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        subject: 'Chemistry',
        date: '2023-06-20T15:30:00',
        duration: 60,
        status: 'upcoming',
        sessionType: 'online',
        price: 60,
        notes: 'Focus on organic chemistry reactions.',
      },
      {
        id: '4',
        tutorId: 't4',
        tutorName: 'Mr. James Wilson',
        tutorAvatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        subject: 'Biology',
        date: '2023-06-05T09:00:00',
        duration: 60,
        status: 'cancelled',
        sessionType: 'online',
        price: 45,
        notes: 'Cancelled due to technical issues.',
      },
    ];

    setBookings(mockBookings);
    setLoading(false);
  }, []);
  
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      tutorId: 1,
      tutorName: 'John Smith',
      tutorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      subject: 'Mathematics',
      startDate: '2023-03-01',
      endDate: '2023-06-30',
      totalSessions: 10,
      completedSessions: 4,
      status: 'ongoing',
      materials: [
        { id: 1, name: 'Course Syllabus.pdf', url: '#' },
        { id: 2, name: 'Week 1 Notes.pdf', url: '#' },
        { id: 3, name: 'Week 2 Notes.pdf', url: '#' },
        { id: 4, name: 'Week 3 Notes.pdf', url: '#' },
        { id: 5, name: 'Week 4 Notes.pdf', url: '#' }
      ],
      certificate: { id: 1, name: 'Advanced Mathematics Certificate.pdf', url: '#', available: false }
    },
    {
      id: 2,
      title: 'English Literature',
      tutorId: 2,
      tutorName: 'Sarah Johnson',
      tutorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      subject: 'English',
      startDate: '2023-02-15',
      endDate: '2023-05-15',
      totalSessions: 8,
      completedSessions: 8,
      status: 'completed',
      materials: [
        { id: 6, name: 'Course Syllabus.pdf', url: '#' },
        { id: 7, name: 'Week 1 Notes.pdf', url: '#' },
        { id: 8, name: 'Week 2 Notes.pdf', url: '#' },
        { id: 9, name: 'Week 3 Notes.pdf', url: '#' },
        { id: 10, name: 'Week 4 Notes.pdf', url: '#' },
        { id: 11, name: 'Week 5 Notes.pdf', url: '#' },
        { id: 12, name: 'Week 6 Notes.pdf', url: '#' },
        { id: 13, name: 'Week 7 Notes.pdf', url: '#' },
        { id: 14, name: 'Week 8 Notes.pdf', url: '#' }
      ],
      certificate: { id: 2, name: 'English Literature Certificate.pdf', url: '#', available: true }
    },
    {
      id: 3,
      title: 'Introduction to Physics',
      tutorId: 3,
      tutorName: 'Michael Brown',
      tutorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      subject: 'Physics',
      startDate: '2023-04-01',
      endDate: '2023-07-15',
      totalSessions: 12,
      completedSessions: 2,
      status: 'ongoing',
      materials: [
        { id: 15, name: 'Course Syllabus.pdf', url: '#' },
        { id: 16, name: 'Week 1 Notes.pdf', url: '#' },
        { id: 17, name: 'Week 2 Notes.pdf', url: '#' }
      ],
      certificate: { id: 3, name: 'Physics Certificate.pdf', url: '#', available: false }
    }
  ];
  
  // Handle reschedule booking
  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    onRescheduleOpen();
  };
  
  // Handle cancel booking
  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    onCancelOpen();
  };
  
  // Handle rate tutor
  const handleRate = (booking) => {
    setSelectedBooking(booking);
    setRating(booking.rating || 0);
    onRateOpen();
  };
  
  // Handle view notes
  const handleViewNotes = (booking) => {
    setSelectedBooking(booking);
    onNotesOpen();
  };
  
  // Handle ask question
  const handleAskQuestion = (course) => {
    setSelectedCourse(course);
    setQuestion('');
    onQuestionOpen();
  };
  
  // Confirm reschedule
  const confirmReschedule = () => {
    // In a real app, this would make an API call to reschedule the booking
    toast({
      title: 'Booking Rescheduled',
      description: `Your session with ${selectedBooking.tutorName} has been rescheduled.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onRescheduleClose();
  };
  
  // Confirm cancel
  const confirmCancel = () => {
    // In a real app, this would make an API call to cancel the booking
    toast({
      title: 'Booking Cancelled',
      description: `Your session with ${selectedBooking.tutorName} has been cancelled.`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    onCancelClose();
  };
  
  // Submit rating
  const submitRating = () => {
    // In a real app, this would make an API call to submit the rating
    toast({
      title: 'Rating Submitted',
      description: `Thank you for rating your session with ${selectedBooking.tutorName}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onRateClose();
  };
  
  // Submit question
  const submitQuestion = () => {
    // In a real app, this would make an API call to submit the question
    toast({
      title: 'Question Sent',
      description: `Your question has been sent to ${selectedCourse.tutorName}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onQuestionClose();
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  };

  const renderBookingCard = (booking) => {
    const isUpcoming = booking.status === 'upcoming';
    const isCompleted = booking.status === 'completed';
    const isCancelled = booking.status === 'cancelled';
    const formattedDate = format(parseISO(booking.date), 'MMMM d, yyyy');
    const formattedTime = format(parseISO(booking.date), 'h:mm a');

    return (
      <Card key={booking.id} mb={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Flex justify="space-between" align="center">
              <HStack>
                <Avatar size="md" name={booking.tutorName} src={booking.tutorAvatar} />
                <Box>
                  <Heading size="md">{booking.tutorName}</Heading>
                  <Text color="gray.500">{booking.subject}</Text>
                </Box>
              </HStack>
              <Badge colorScheme={getStatusColor(booking.status)} p={2} borderRadius="md">
                <HStack>
                  <Icon as={getStatusIcon(booking.status)} />
                  <Text>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</Text>
                </HStack>
              </Badge>
            </Flex>

            <HStack spacing={4}>
              <HStack>
                <Icon as={FaCalendarAlt} color="blue.500" />
                <Text>{formattedDate}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} color="blue.500" />
                <Text>{formattedTime} ({booking.duration} min)</Text>
              </HStack>
              <HStack>
                <Icon as={booking.sessionType === 'online' ? FaVideo : FaUserFriends} color="blue.500" />
                <Text>{booking.sessionType === 'online' ? 'Online' : 'In-Person'}</Text>
              </HStack>
              <HStack>
                <Icon as={FaComments} color="blue.500" />
                <Text>${booking.price}</Text>
              </HStack>
            </HStack>

            {booking.notes && (
              <Box>
                <Text fontWeight="bold">Notes:</Text>
                <Text>{booking.notes}</Text>
              </Box>
            )}

            <HStack spacing={4} justify="flex-end">
              {isUpcoming && (
                <>
                  <Button
                    leftIcon={<FaCalendarAlt />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleReschedule(booking)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    leftIcon={<FaTimes />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleCancel(booking)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {isCompleted && !booking.rating && (
                <Button
                  leftIcon={<FaStar />}
                  colorScheme="yellow"
                  onClick={() => handleRate(booking)}
                >
                  Rate Session
                </Button>
              )}
              {booking.rating && (
                <HStack>
                  <Text fontWeight="bold">Your Rating:</Text>
                  <HStack>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        as={FaStar}
                        color={i < booking.rating ? 'yellow.400' : 'gray.300'}
                      />
                    ))}
                  </HStack>
                </HStack>
              )}
              <Button
                leftIcon={<FaComments />}
                colorScheme="teal"
                variant="ghost"
                onClick={() => handleViewNotes(booking)}
              >
                View Notes
              </Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return FaCalendarAlt;
      case 'completed':
        return FaCheckCircle;
      case 'cancelled':
        return FaTimes;
      default:
        return FaExclamationTriangle;
    }
  };

  // Render upcoming bookings
  const renderUpcomingBookings = () => {
    if (bookings.length === 0) {
      return (
        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>No Upcoming Bookings</AlertTitle>
            <AlertDescription>
              You don't have any upcoming tutoring sessions. Book a session with a tutor to get started.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tutor</Th>
            <Th>Subject</Th>
            <Th>Date & Time</Th>
            <Th>Mode</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>
                <HStack>
                  <Avatar size="sm" name={booking.tutorName} src={booking.tutorAvatar} />
                  <Text>{booking.tutorName}</Text>
                </HStack>
              </Td>
              <Td>{booking.subject}</Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text>{formatDate(booking.date)}</Text>
                  <Text fontSize="sm" color="gray.500">{format(parseISO(booking.date), 'h:mm a')} ({booking.duration} min)</Text>
                </VStack>
              </Td>
              <Td>
                <HStack>
                  <Icon as={booking.sessionType === 'online' ? FaVideo : FaUserFriends} />
                  <Text>{booking.sessionType === 'online' ? 'Online' : 'In-person'}</Text>
                </HStack>
              </Td>
              <Td>
                <Badge colorScheme={booking.status === 'upcoming' ? 'blue' : booking.status === 'completed' ? 'green' : 'red'}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  {booking.sessionType === 'online' && booking.status === 'upcoming' && (
                    <Tooltip label="Join Session">
                      <Button
                        as="a"
                        href={`https://meet.google.com/${booking.id}`}
                        target="_blank"
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<FaLink />}
                      >
                        Join
                      </Button>
                    </Tooltip>
                  )}
                  {booking.status === 'upcoming' && (
                    <Tooltip label="Reschedule">
                      <Button
                        size="sm"
                        colorScheme="teal"
                        leftIcon={<FaCalendarAlt />}
                        onClick={() => handleReschedule(booking)}
                      >
                        Reschedule
                      </Button>
                    </Tooltip>
                  )}
                  {booking.status === 'upcoming' && (
                    <Tooltip label="Cancel">
                      <Button
                        size="sm"
                        colorScheme="red"
                        leftIcon={<FaTimes />}
                        onClick={() => handleCancel(booking)}
                      >
                        Cancel
                      </Button>
                    </Tooltip>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };
  
  // Render past bookings
  const renderPastBookings = () => {
    if (bookings.length === 0) {
      return (
        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>No Past Bookings</AlertTitle>
            <AlertDescription>
              You don't have any past tutoring sessions.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tutor</Th>
            <Th>Subject</Th>
            <Th>Date & Time</Th>
            <Th>Mode</Th>
            <Th>Rating</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>
                <HStack>
                  <Avatar size="sm" name={booking.tutorName} src={booking.tutorAvatar} />
                  <Text>{booking.tutorName}</Text>
                </HStack>
              </Td>
              <Td>{booking.subject}</Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text>{formatDate(booking.date)}</Text>
                  <Text fontSize="sm" color="gray.500">{format(parseISO(booking.date), 'h:mm a')} ({booking.duration} min)</Text>
                </VStack>
              </Td>
              <Td>
                <HStack>
                  <Icon as={booking.sessionType === 'online' ? FaVideo : FaUserFriends} />
                  <Text>{booking.sessionType === 'online' ? 'Online' : 'In-person'}</Text>
                </HStack>
              </Td>
              <Td>
                {booking.rating ? (
                  <HStack>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        as={FaStar}
                        color={i < booking.rating ? 'yellow.400' : 'gray.300'}
                      />
                    ))}
                  </HStack>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    leftIcon={<FaStar />}
                    onClick={() => handleRate(booking)}
                  >
                    Rate
                  </Button>
                )}
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="View Notes & Materials">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      leftIcon={<FaFileAlt />}
                      onClick={() => handleViewNotes(booking)}
                    >
                      Notes
                    </Button>
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };
  
  // Render courses
  const renderCourses = () => {
    if (courses.length === 0) {
      return (
        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>No Courses Enrolled</AlertTitle>
            <AlertDescription>
              You don't have any enrolled courses. Browse available courses to get started.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {courses.map((course) => (
          <Card key={course.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Avatar name={course.tutorName} src={course.tutorAvatar} />
                  <VStack align="start" spacing={1}>
                    <Heading size="md">{course.title}</Heading>
                    <Text fontSize="sm" color="gray.500">{course.tutorName}</Text>
                  </VStack>
                </HStack>
                <Badge colorScheme={course.status === 'completed' ? 'green' : 'blue'}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Box width="100%">
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm">Progress</Text>
                    <Text fontSize="sm">{course.completedSessions}/{course.totalSessions} sessions</Text>
                  </Flex>
                  <Progress
                    value={(course.completedSessions / course.totalSessions) * 100}
                    colorScheme={course.status === 'completed' ? 'green' : 'blue'}
                    borderRadius="full"
                  />
                </Box>
                
                <Box width="100%">
                  <Text fontWeight="bold" mb={2}>Course Materials</Text>
                  <VStack align="start" spacing={2}>
                    {course.materials.map((material) => (
                      <Button
                        key={material.id}
                        size="sm"
                        leftIcon={<FaDownload />}
                        variant="outline"
                        as="a"
                        href={material.url}
                        target="_blank"
                      >
                        {material.name}
                      </Button>
                    ))}
                  </VStack>
                </Box>
                
                {course.certificate.available && (
                  <Box width="100%">
                    <Text fontWeight="bold" mb={2}>Certificate</Text>
                    <Button
                      size="sm"
                      leftIcon={<FaCertificate />}
                      colorScheme="green"
                      as="a"
                      href={course.certificate.url}
                      target="_blank"
                    >
                      Download Certificate
                    </Button>
                  </Box>
                )}
                
                <HStack width="100%" justify="space-between">
                  <Button
                    size="sm"
                    leftIcon={<FaComments />}
                    colorScheme="teal"
                    onClick={() => handleAskQuestion(course)}
                  >
                    Ask Question
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FaBook />}
                    colorScheme="blue"
                    as="a"
                    href={`/course/${course.id}`}
                  >
                    View Course
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    );
  };
  
  return (
    <Box pt={20}>
      <Container maxW="1200px">
        <Heading size="lg" mb={6}>My Bookings</Heading>
        
        <Tabs mb={8}>
          <TabList>
            <Tab>Upcoming Sessions</Tab>
            <Tab>Past Sessions</Tab>
            <Tab>Cancelled Sessions</Tab>
          </TabList>
          
          <TabPanels>
            {/* Upcoming Sessions Tab */}
            <TabPanel>
              {loading ? (
                <Text>Loading...</Text>
              ) : bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                bookings
                  .filter(b => b.status === 'upcoming')
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(renderBookingCard)
              ) : (
                <Card p={6} textAlign="center">
                  <Text fontSize="lg">You don't have any upcoming sessions.</Text>
                  <Button mt={4} colorScheme="blue" onClick={() => window.location.href = '/find-tutors'}>
                    Find a Tutor
                  </Button>
                </Card>
              )}
            </TabPanel>
            
            {/* Past Sessions Tab */}
            <TabPanel>
              {loading ? (
                <Text>Loading...</Text>
              ) : bookings.filter(b => b.status === 'completed').length > 0 ? (
                bookings
                  .filter(b => b.status === 'completed')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(renderBookingCard)
              ) : (
                <Card p={6} textAlign="center">
                  <Text fontSize="lg">You don't have any past sessions.</Text>
                </Card>
              )}
            </TabPanel>
            
            {/* Cancelled Sessions Tab */}
            <TabPanel>
              {loading ? (
                <Text>Loading...</Text>
              ) : bookings.filter(b => b.status === 'cancelled').length > 0 ? (
                bookings
                  .filter(b => b.status === 'cancelled')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(renderBookingCard)
              ) : (
                <Card p={6} textAlign="center">
                  <Text fontSize="lg">You don't have any cancelled sessions.</Text>
                </Card>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* Reschedule Modal */}
        <Modal isOpen={isRescheduleOpen} onClose={onRescheduleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reschedule Session</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Tutor:</strong> {selectedBooking?.tutorName}
                </Text>
                <Text>
                  <strong>Subject:</strong> {selectedBooking?.subject}
                </Text>
                <Text>
                  <strong>Current Date:</strong> {selectedBooking && formatDate(selectedBooking.date)}
                </Text>
                <Text>
                  <strong>Current Time:</strong> {format(parseISO(selectedBooking.date), 'h:mm a')}
                </Text>
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Rescheduling Policy</AlertTitle>
                    <AlertDescription>
                      {selectedBooking?.notes}
                    </AlertDescription>
                  </Box>
                </Alert>
                <Text>
                  Please select a new date and time for your session. The tutor will be notified of your request.
                </Text>
                {/* In a real app, this would include a calendar and time picker */}
                <Text fontSize="sm" color="gray.500">
                  Calendar and time picker would be implemented here.
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onRescheduleClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={confirmReschedule}>
                Confirm Reschedule
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Cancel Modal */}
        <Modal isOpen={isCancelOpen} onClose={onCancelClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cancel Session</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Tutor:</strong> {selectedBooking?.tutorName}
                </Text>
                <Text>
                  <strong>Subject:</strong> {selectedBooking?.subject}
                </Text>
                <Text>
                  <strong>Date:</strong> {selectedBooking && formatDate(selectedBooking.date)}
                </Text>
                <Text>
                  <strong>Time:</strong> {format(parseISO(selectedBooking.date), 'h:mm a')}
                </Text>
                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Cancellation Policy</AlertTitle>
                    <AlertDescription>
                      {selectedBooking?.notes}
                    </AlertDescription>
                  </Box>
                </Alert>
                <Text>
                  Are you sure you want to cancel this session?
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onCancelClose}>
                No, Keep It
              </Button>
              <Button colorScheme="red" onClick={confirmCancel}>
                Yes, Cancel Session
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Rate Modal */}
        <Modal isOpen={isRateOpen} onClose={onRateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rate Your Session</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Tutor:</strong> {selectedBooking?.tutorName}
                </Text>
                <Text>
                  <strong>Subject:</strong> {selectedBooking?.subject}
                </Text>
                <Text>
                  <strong>Date:</strong> {selectedBooking && formatDate(selectedBooking.date)}
                </Text>
                <HStack spacing={2}>
                  <Text>Rating:</Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      as={FaStar}
                      boxSize={6}
                      color={star <= rating ? 'yellow.400' : 'gray.300'}
                      cursor="pointer"
                      onClick={() => setRating(star)}
                    />
                  ))}
                </HStack>
                <Text>
                  Please provide your feedback on this session.
                </Text>
                {/* In a real app, this would include a text area for feedback */}
                <Text fontSize="sm" color="gray.500">
                  Feedback text area would be implemented here.
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onRateClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={submitRating}>
                Submit Rating
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Notes Modal */}
        <Modal isOpen={isNotesOpen} onClose={onNotesClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Session Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Tutor:</strong> {selectedBooking?.tutorName}
                </Text>
                <Text>
                  <strong>Subject:</strong> {selectedBooking?.subject}
                </Text>
                <Text>
                  <strong>Date:</strong> {selectedBooking && formatDate(selectedBooking.date)}
                </Text>
                <Divider />
                <Box width="100%">
                  <Text fontWeight="bold" mb={2}>Session Notes</Text>
                  <Text>{selectedBooking?.notes}</Text>
                </Box>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onNotesClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Ask Question Modal */}
        <Modal isOpen={isQuestionOpen} onClose={onQuestionClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ask a Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Course:</strong> {selectedCourse?.title}
                </Text>
                <Text>
                  <strong>Tutor:</strong> {selectedCourse?.tutorName}
                </Text>
                <Text>
                  Please type your question below. The tutor will respond as soon as possible.
                </Text>
                {/* In a real app, this would include a text area for the question */}
                <Text fontSize="sm" color="gray.500">
                  Question text area would be implemented here.
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onQuestionClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={submitQuestion}>
                Send Question
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default MyBookings; 