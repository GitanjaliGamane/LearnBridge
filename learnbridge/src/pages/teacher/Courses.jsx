import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SimpleGrid,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { HamburgerIcon } from '@chakra-ui/icons';

const Courses = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      level: 'Advanced',
      description: 'Comprehensive course covering calculus, linear algebra, and statistics.',
      duration: 60,
      price: 50,
      students: 12,
      rating: 4.8,
      status: 'active',
      schedule: 'Mon, Wed, Fri',
      startDate: '2024-04-01',
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      subject: 'Physics',
      level: 'Intermediate',
      description: 'Introduction to classical mechanics, thermodynamics, and waves.',
      duration: 45,
      price: 45,
      students: 8,
      rating: 4.5,
      status: 'active',
      schedule: 'Tue, Thu',
      startDate: '2024-04-15',
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      subject: 'Chemistry',
      level: 'Beginner',
      description: 'Basic concepts of atomic structure, chemical bonding, and reactions.',
      duration: 45,
      price: 40,
      students: 15,
      rating: 4.7,
      status: 'draft',
      schedule: 'Mon, Wed',
      startDate: '2024-05-01',
    },
    {
      id: 4,
      title: 'Biology Essentials',
      subject: 'Biology',
      level: 'Intermediate',
      description: 'Study of living organisms, cells, and ecosystems.',
      duration: 60,
      price: 45,
      students: 10,
      rating: 4.6,
      status: 'archived',
      schedule: 'Tue, Thu, Sat',
      startDate: '2024-03-15',
    },
  ];
  
  const [courses, setCourses] = useState(user?.courses || mockCourses);
  const [newCourse, setNewCourse] = useState({
    title: '',
    subject: '',
    level: 'Beginner',
    description: '',
    duration: 45,
    price: 40,
    schedule: '',
    startDate: '',
  });

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });
  const containerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const cardSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement API call to create course
      const response = {
        id: Date.now(),
        ...newCourse,
        students: 0,
        rating: 0,
        status: 'draft',
      };

      setCourses((prev) => [...prev, response]);
      setNewCourse({
        title: '',
        subject: '',
        level: 'Beginner',
        description: '',
        duration: 45,
        price: 40,
        schedule: '',
        startDate: '',
      });
      onClose();

      toast({
        title: 'Course created',
        description: 'Your course has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating course',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'draft':
        return 'yellow';
      case 'archived':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Render course cards for mobile view
  const renderCourseCards = () => {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={cardSpacing}>
        {courses.map((course) => (
          <Card key={course.id} variant="outline" borderColor={borderColor}>
            <CardHeader>
              <Flex direction="column" gap={2}>
                <Heading size="md">{course.title}</Heading>
                <Badge colorScheme={getStatusColor(course.status)} alignSelf="flex-start">
                  {course.status}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={2}>
                <Text><strong>Subject:</strong> {course.subject}</Text>
                <Text><strong>Level:</strong> {course.level}</Text>
                <Text><strong>Students:</strong> {course.students}</Text>
                <Text><strong>Rating:</strong> {course.rating}</Text>
                <Text><strong>Schedule:</strong> {course.schedule}</Text>
                <Text><strong>Start Date:</strong> {course.startDate}</Text>
                <Text><strong>Price:</strong> ${course.price}</Text>
                <Text noOfLines={2}><strong>Description:</strong> {course.description}</Text>
              </VStack>
            </CardBody>
            <CardFooter>
              <HStack spacing={2} width="100%" justify="flex-end">
                <Button size="sm" colorScheme="blue" variant="outline">
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" variant="outline">
                  Delete
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  // Render course table for desktop view
  const renderCourseTable = () => {
    return (
      <Box
        p={containerPadding}
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflowX="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course Title</Th>
              <Th>Subject</Th>
              <Th>Level</Th>
              <Th>Students</Th>
              <Th>Rating</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.title}</Td>
                <Td>{course.subject}</Td>
                <Td>{course.level}</Td>
                <Td>{course.students}</Td>
                <Td>{course.rating}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="blue" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" variant="outline">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px" px={containerPadding}>
        <VStack spacing={8} align="stretch">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} gap={4}>
            <Heading size="lg">My Courses</Heading>
            <Button colorScheme="blue" onClick={onOpen} alignSelf={{ base: "stretch", md: "flex-start" }}>
              Create New Course
            </Button>
          </Flex>

          {isMobile ? renderCourseCards() : renderCourseTable()}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Course Title</FormLabel>
                <Input
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced Mathematics"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Subject</FormLabel>
                <Input
                  name="subject"
                  value={newCourse.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Level</FormLabel>
                <Select
                  name="level"
                  value={newCourse.level}
                  onChange={handleInputChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  placeholder="Describe your course..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Duration (minutes)</FormLabel>
                <NumberInput
                  value={newCourse.duration}
                  onChange={(value) => handleNumberChange('duration', value)}
                  min={15}
                  max={180}
                  step={15}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Price ($)</FormLabel>
                <NumberInput
                  value={newCourse.price}
                  onChange={(value) => handleNumberChange('price', value)}
                  min={0}
                  max={1000}
                  step={5}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Schedule</FormLabel>
                <Input
                  name="schedule"
                  value={newCourse.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon, Wed, Fri"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  name="startDate"
                  type="date"
                  value={newCourse.startDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
                Create Course
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Courses; 