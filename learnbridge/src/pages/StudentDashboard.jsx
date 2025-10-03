import {
  Box,
  Container,
  Heading,
  Grid,
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
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Progress,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaCalendarAlt, 
  FaStar, 
  FaBook, 
  FaBell, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaSearch,
  FaCalendarPlus,
  FaVideo,
  FaUserFriends,
  FaCog,
  FaGraduationCap,
  FaChartLine,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { user } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Mock data for student
  const studentName = user?.name || 'Student';
  
  // Mock data for quick stats
  const [quickStats, setQuickStats] = useState({
    upcomingSessions: 0,
    favoriteTutors: 0,
    coursesEnrolled: 0,
    completedSessions: 0
  });
  
  // Mock data for upcoming sessions
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  // Mock data for notifications
  const [notifications, setNotifications] = useState([]);

  // Mock data for enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock data for favorite tutors
  const [favoriteTutors, setFavoriteTutors] = useState([]);

  // Load demo data
  useEffect(() => {
    const loadDemoData = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        setQuickStats({
          upcomingSessions: 3,
          favoriteTutors: 2,
          coursesEnrolled: 4,
          completedSessions: 12
        });

        setUpcomingSessions([
          {
            id: 1,
            tutor: 'John Smith',
            subject: 'Mathematics',
            date: '2024-04-10T14:00:00Z',
            duration: 60,
            type: 'online',
            status: 'confirmed',
            meetingLink: 'https://meet.google.com/abc-xyz-123'
          },
          {
            id: 2,
            tutor: 'Sarah Johnson',
            subject: 'Physics',
            date: '2024-04-12T15:30:00Z',
            duration: 90,
            type: 'offline',
            status: 'pending',
            location: '123 Main St, New York'
          },
          {
            id: 3,
            tutor: 'Michael Brown',
            subject: 'Chemistry',
            date: '2024-04-15T10:00:00Z',
            duration: 60,
            type: 'online',
            status: 'confirmed',
            meetingLink: 'https://meet.google.com/def-uvw-456'
          }
        ]);

        setNotifications([
          {
            id: 1,
            type: 'success',
            message: 'Your session with John Smith has been confirmed for tomorrow at 2 PM',
            time: '2 hours ago',
            read: false
          },
          {
            id: 2,
            type: 'info',
            message: 'Sarah Johnson has responded to your message',
            time: '5 hours ago',
            read: false
          },
          {
            id: 3,
            type: 'info',
            message: 'New course "Advanced Mathematics" is now available',
            time: '1 day ago',
            read: true
          }
        ]);

        setEnrolledCourses([
          {
            id: 1,
            title: 'Advanced Mathematics',
            tutor: 'John Smith',
            progress: 75,
            totalSessions: 10,
            completedSessions: 7,
            nextSession: '2024-04-10T14:00:00Z'
          },
          {
            id: 2,
            title: 'Physics Fundamentals',
            tutor: 'Sarah Johnson',
            progress: 40,
            totalSessions: 8,
            completedSessions: 3,
            nextSession: '2024-04-12T15:30:00Z'
          },
          {
            id: 3,
            title: 'Chemistry Basics',
            tutor: 'Michael Brown',
            progress: 60,
            totalSessions: 12,
            completedSessions: 7,
            nextSession: '2024-04-15T10:00:00Z'
          }
        ]);

        setFavoriteTutors([
          {
            id: 1,
            name: 'John Smith',
            subject: 'Mathematics',
            rating: 4.9,
            totalStudents: 150,
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            subject: 'Physics',
            rating: 4.8,
            totalStudents: 120,
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    loadDemoData();
  }, []);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    onOpen();
  };

  const handleJoinSession = (session) => {
    if (session.type === 'online') {
      window.open(session.meetingLink, '_blank');
    } else {
      toast({
        title: 'In-person Session',
        description: `Please go to ${session.location} for your session`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const renderLoadingSkeleton = () => (
    <Box>
      <Skeleton height="100px" mb={4} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
        {[...Array(4)].map((_, i) => (
          <Skeleton height="100px" key={i} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
        {[...Array(2)].map((_, i) => (
          <Skeleton height="100px" key={i} />
        ))}
      </SimpleGrid>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <Box>
          <Skeleton height="300px" mb={6} />
          <Skeleton height="300px" />
        </Box>
        <Box>
          <Skeleton height="200px" mb={6} />
          <Skeleton height="300px" />
        </Box>
      </Grid>
    </Box>
  );

  if (isLoading) {
    return (
      <Box pt={20} pb={10}>
        <Container maxW="1200px">
          {renderLoadingSkeleton()}
        </Container>
      </Box>
    );
  }

  return (
    <Box pt={20} pb={10}>
      <Container maxW="1200px">
        {/* Welcome Section */}
        <Box mb={8}>
          <HStack spacing={4} align="center">
            <Avatar size="xl" name={studentName} />
            <Box>
              <Heading size="lg" mb={1}>
                Hi {studentName} 👋
              </Heading>
              <Text color="gray.500">Welcome to your personalized dashboard</Text>
            </Box>
          </HStack>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Main Content */}
          <Box>
            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <HStack spacing={4}>
                    <Box p={3} bg="blue.50" borderRadius="full">
                      <Icon as={FaCalendarAlt} boxSize={6} color="blue.500" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Upcoming Sessions</Text>
                      <Text fontSize="xl" fontWeight="bold">{quickStats.upcomingSessions}</Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <HStack spacing={4}>
                    <Box p={3} bg="purple.50" borderRadius="full">
                      <Icon as={FaStar} boxSize={6} color="purple.500" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Favorite Tutors</Text>
                      <Text fontSize="xl" fontWeight="bold">{quickStats.favoriteTutors}</Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <HStack spacing={4}>
                    <Box p={3} bg="green.50" borderRadius="full">
                      <Icon as={FaBook} boxSize={6} color="green.500" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Courses Enrolled</Text>
                      <Text fontSize="xl" fontWeight="bold">{quickStats.coursesEnrolled}</Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <HStack spacing={4}>
                    <Box p={3} bg="yellow.50" borderRadius="full">
                      <Icon as={FaGraduationCap} boxSize={6} color="yellow.500" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Completed Sessions</Text>
                      <Text fontSize="xl" fontWeight="bold">{quickStats.completedSessions}</Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Quick Actions */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              <Button
                as={RouterLink}
                to="/find-tutors"
                colorScheme="blue"
                size="lg"
                leftIcon={<FaSearch />}
                height="auto"
                py={6}
              >
                <VStack align="start" spacing={1}>
                  <Text>Find Tutors</Text>
                  <Text fontSize="sm" color="gray.500">Search and book sessions</Text>
                </VStack>
              </Button>

              <Button
                as={RouterLink}
                to="/book-session"
                colorScheme="green"
                size="lg"
                leftIcon={<FaCalendarPlus />}
                height="auto"
                py={6}
              >
                <VStack align="start" spacing={1}>
                  <Text>Book a Session</Text>
                  <Text fontSize="sm" color="gray.500">Schedule with your tutor</Text>
                </VStack>
              </Button>
            </SimpleGrid>

            {/* Upcoming Sessions */}
            <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Upcoming Sessions</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {upcomingSessions.map((session) => (
                    <Box
                      key={session.id}
                      p={4}
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => handleSessionClick(session)}
                    >
                      <HStack justify="space-between">
                        <HStack spacing={4}>
                          <Avatar size="sm" name={session.tutor} />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{session.tutor}</Text>
                            <Text color="gray.500">{session.subject}</Text>
                          </VStack>
                        </HStack>
                        <VStack align="end" spacing={1}>
                          <Text>{formatDate(session.date)}</Text>
                          <Badge colorScheme={session.type === 'online' ? 'green' : 'blue'}>
                            {session.type}
                          </Badge>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Enrolled Courses */}
            <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Enrolled Courses</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {enrolledCourses.map((course) => (
                    <Box
                      key={course.id}
                      p={4}
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                    >
                      <VStack align="stretch" spacing={3}>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">{course.title}</Text>
                          <Badge colorScheme="blue">
                            {course.completedSessions}/{course.totalSessions} Sessions
                          </Badge>
                        </HStack>
                        <Text color="gray.500">Tutor: {course.tutor}</Text>
                        <Text color="gray.500">Next Session: {formatDate(course.nextSession)}</Text>
                        <Progress value={course.progress} size="sm" colorScheme="blue" />
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </Box>

          {/* Sidebar */}
          <Box>
            {/* Profile Card */}
            <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Your Profile</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  <Avatar size="xl" name={studentName} />
                  <VStack spacing={1}>
                    <Text fontSize="lg" fontWeight="bold">
                      {studentName}
                    </Text>
                    <Text color="gray.500">Grade 10 Student</Text>
                  </VStack>
                  <Button
                    as={RouterLink}
                    to="/edit-profile"
                    colorScheme="blue"
                    width="100%"
                    leftIcon={<FaCog />}
                  >
                    Edit Profile
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Notifications Panel */}
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md">Notifications</Heading>
                  <Icon as={FaBell} color="blue.500" />
                </HStack>
              </CardHeader>
              <CardBody>
                <List spacing={3}>
                  {notifications.map((notification) => (
                    <ListItem 
                      key={notification.id}
                      p={3}
                      bg={!notification.read ? 'blue.50' : 'transparent'}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => handleMarkNotificationAsRead(notification.id)}
                    >
                      <HStack align="start" spacing={3}>
                        <ListIcon 
                          as={notification.type === 'success' ? FaCheckCircle : FaExclamationCircle} 
                          color={notification.type === 'success' ? 'green.500' : 'blue.500'} 
                          boxSize={5} 
                          mt={1}
                        />
                        <Box>
                          <Text>{notification.message}</Text>
                          <Text fontSize="xs" color="gray.500">{notification.time}</Text>
                        </Box>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </Box>
        </Grid>
      </Container>

      {/* Session Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSession && (
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Avatar size="lg" name={selectedSession.tutor} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{selectedSession.tutor}</Text>
                    <Text color="gray.500">{selectedSession.subject}</Text>
                  </VStack>
                </HStack>
                <Divider />
                <Box>
                  <Text fontWeight="bold">Date & Time</Text>
                  <Text>{formatDate(selectedSession.date)}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Duration</Text>
                  <Text>{selectedSession.duration} minutes</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Type</Text>
                  <Badge colorScheme={selectedSession.type === 'online' ? 'green' : 'blue'}>
                    {selectedSession.type}
                  </Badge>
                </Box>
                {selectedSession.type === 'online' ? (
                  <Box>
                    <Text fontWeight="bold">Meeting Link</Text>
                    <Text color="blue.500" cursor="pointer" onClick={() => handleJoinSession(selectedSession)}>
                      {selectedSession.meetingLink}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text fontWeight="bold">Location</Text>
                    <Text>{selectedSession.location}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleJoinSession(selectedSession)}>
              Join Session
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudentDashboard; 