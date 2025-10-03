import {
  Box,
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
  Heading,
  SimpleGrid,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { StarIcon, CalendarIcon, BookIcon, BellIcon, ChatIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const DashboardHome = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [student, setStudent] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [favoriteTutors, setFavoriteTutors] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch actual data from API
    setStudent({
      id: 1,
      name: 'John Doe',
      avatar: null,
      grade: '10th Grade',
    });

    setUpcomingSessions([
      {
        id: 1,
        tutor: {
          id: 1,
          name: 'Sarah Johnson',
          avatar: null,
        },
        subject: 'Mathematics',
        date: '2024-03-20T14:00:00Z',
        duration: 60,
        type: 'online',
      },
      {
        id: 2,
        tutor: {
          id: 2,
          name: 'Michael Brown',
          avatar: null,
        },
        subject: 'Physics',
        date: '2024-03-22T15:30:00Z',
        duration: 90,
        type: 'offline',
      },
    ]);

    setFavoriteTutors([
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: null,
        subject: 'Mathematics',
        rating: 4.9,
        totalStudents: 150,
      },
      {
        id: 2,
        name: 'Michael Brown',
        avatar: null,
        subject: 'Physics',
        rating: 4.8,
        totalStudents: 120,
      },
    ]);

    setEnrolledCourses([
      {
        id: 1,
        title: 'Advanced Mathematics',
        tutor: 'Sarah Johnson',
        progress: 4,
        totalSessions: 10,
        nextSession: '2024-03-20T14:00:00Z',
      },
      {
        id: 2,
        title: 'Physics Fundamentals',
        tutor: 'Michael Brown',
        progress: 2,
        totalSessions: 8,
        nextSession: '2024-03-22T15:30:00Z',
      },
    ]);

    setNotifications([
      {
        id: 1,
        type: 'booking',
        message: 'Your session with Sarah Johnson has been confirmed',
        date: '2024-03-18T10:00:00Z',
        read: false,
      },
      {
        id: 2,
        type: 'message',
        message: 'New message from Michael Brown',
        date: '2024-03-17T15:30:00Z',
        read: true,
      },
      {
        id: 3,
        type: 'course',
        message: 'New material available for Advanced Mathematics',
        date: '2024-03-16T09:00:00Z',
        read: false,
      },
    ]);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <CalendarIcon color="blue.500" />;
      case 'message':
        return <ChatIcon color="green.500" />;
      case 'course':
        return <BookIcon color="purple.500" />;
      default:
        return <BellIcon color="gray.500" />;
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Avatar size="xl" name={student?.name} src={student?.avatar} />
            <VStack align="start" spacing={1}>
              <Heading size="lg">Hi {student?.name} 👋</Heading>
              <Text color="gray.500">{student?.grade}</Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={CalendarIcon} color="blue.500" boxSize={6} />
                <Text fontWeight="bold">Upcoming Sessions</Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold">
                {upcomingSessions.length}
              </Text>
              <Text color="gray.500">Next: {formatDate(upcomingSessions[0]?.date)}</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={StarIcon} color="yellow.500" boxSize={6} />
                <Text fontWeight="bold">Favorite Tutors</Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold">
                {favoriteTutors.length}
              </Text>
              <Text color="gray.500">Top rated tutors saved</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={BookIcon} color="green.500" boxSize={6} />
                <Text fontWeight="bold">Courses Enrolled</Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold">
                {enrolledCourses.length}
              </Text>
              <Text color="gray.500">Active courses</Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Main Content */}
        <VStack spacing={6} align="stretch">
          {/* Upcoming Sessions */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Upcoming Sessions</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                {upcomingSessions.map((session) => (
                  <Box
                    key={session.id}
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <HStack justify="space-between">
                      <HStack spacing={4}>
                        <Avatar size="sm" name={session.tutor.name} src={session.tutor.avatar} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">{session.tutor.name}</Text>
                          <Text color="gray.500">{session.subject}</Text>
                        </VStack>
                      </HStack>
                      <VStack align="end" spacing={0}>
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
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Enrolled Courses</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                {enrolledCourses.map((course) => (
                  <Box
                    key={course.id}
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text fontWeight="bold">{course.title}</Text>
                        <Badge colorScheme="blue">
                          {course.progress}/{course.totalSessions} Sessions
                        </Badge>
                      </HStack>
                      <Text color="gray.500">Tutor: {course.tutor}</Text>
                      <Text color="gray.500">Next Session: {formatDate(course.nextSession)}</Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        {/* Notifications Panel */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">Notifications</Heading>
          </CardHeader>
          <CardBody>
            <List spacing={3}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  p={3}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="md"
                  bg={notification.read ? 'transparent' : 'blue.50'}
                >
                  <HStack align="start" spacing={3}>
                    <ListIcon as={getNotificationIcon(notification.type)} boxSize={5} />
                    <VStack align="start" spacing={0}>
                      <Text>{notification.message}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {formatDate(notification.date)}
                      </Text>
                    </VStack>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default DashboardHome; 