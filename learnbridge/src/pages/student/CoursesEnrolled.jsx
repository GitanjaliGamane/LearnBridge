import {
  Box,
  Grid,
  Card,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Heading,
  Progress,
  Icon,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  BookIcon,
  DownloadIcon,
  ChatIcon,
  CalendarIcon,
  StarIcon,
  CheckCircleIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const CoursesEnrolled = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [courses, setCourses] = useState({
    ongoing: [],
    completed: [],
  });
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // TODO: Fetch actual data from API
    setCourses({
      ongoing: [
        {
          id: 1,
          title: 'Advanced Mathematics',
          tutor: {
            id: 1,
            name: 'Sarah Johnson',
            avatar: null,
          },
          progress: 4,
          totalSessions: 10,
          nextSession: '2024-03-20T14:00:00Z',
          materials: [
            {
              id: 1,
              title: 'Introduction to Calculus',
              type: 'pdf',
              url: '#',
              uploadedAt: '2024-03-15T10:00:00Z',
            },
            {
              id: 2,
              title: 'Practice Problems - Week 1',
              type: 'pdf',
              url: '#',
              uploadedAt: '2024-03-15T10:00:00Z',
            },
          ],
          schedule: [
            {
              id: 1,
              date: '2024-03-20T14:00:00Z',
              topic: 'Limits and Continuity',
              status: 'upcoming',
            },
            {
              id: 2,
              date: '2024-03-27T14:00:00Z',
              topic: 'Derivatives',
              status: 'upcoming',
            },
          ],
        },
      ],
      completed: [
        {
          id: 2,
          title: 'Physics Fundamentals',
          tutor: {
            id: 2,
            name: 'Michael Brown',
            avatar: null,
          },
          progress: 8,
          totalSessions: 8,
          completedAt: '2024-03-10T15:00:00Z',
          rating: 5,
          feedback: 'Excellent course! Learned a lot.',
          materials: [
            {
              id: 3,
              title: 'Final Exam Study Guide',
              type: 'pdf',
              url: '#',
              uploadedAt: '2024-03-08T10:00:00Z',
            },
          ],
        },
      ],
    });
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

  const handleDownload = (material) => {
    // TODO: Implement download logic
    toast({
      title: 'Downloading Material',
      description: `Downloading ${material.title}...`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChat = (tutorId) => {
    // TODO: Implement chat logic
    onAction('chat', tutorId);
  };

  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
    onOpen();
  };

  const renderCourseCard = (course) => (
    <Card key={course.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack>
            <Avatar size="md" name={course.tutor.name} src={course.tutor.avatar} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{course.title}</Text>
              <Text color="gray.500">Tutor: {course.tutor.name}</Text>
            </VStack>
            <Spacer />
            <Badge colorScheme={course.progress === course.totalSessions ? 'green' : 'blue'}>
              {course.progress}/{course.totalSessions} Sessions
            </Badge>
          </HStack>

          <Box>
            <Text mb={2}>Progress</Text>
            <Progress
              value={(course.progress / course.totalSessions) * 100}
              colorScheme="blue"
              size="sm"
            />
          </Box>

          {course.nextSession && (
            <HStack>
              <Icon as={CalendarIcon} color="gray.500" />
              <Text>Next Session: {formatDate(course.nextSession)}</Text>
            </HStack>
          )}

          {course.completedAt && (
            <HStack>
              <Icon as={CheckCircleIcon} color="green.500" />
              <Text>Completed on {formatDate(course.completedAt)}</Text>
            </HStack>
          )}

          <HStack>
            <Button
              leftIcon={<BookIcon />}
              colorScheme="blue"
              size="sm"
              onClick={() => viewCourseDetails(course)}
            >
              View Details
            </Button>
            <Button
              leftIcon={<ChatIcon />}
              colorScheme="teal"
              size="sm"
              onClick={() => handleChat(course.tutor.id)}
            >
              Chat with Tutor
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Ongoing Courses</Tab>
          <Tab>Completed Courses</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {courses.ongoing.map(renderCourseCard)}
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              {courses.completed.map(renderCourseCard)}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Course Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={0}>
              <Text>{selectedCourse?.title}</Text>
              <Text color="gray.500" fontSize="sm">
                Tutor: {selectedCourse?.tutor.name}
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Tabs>
              <TabList>
                <Tab>Materials</Tab>
                <Tab>Schedule</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <List spacing={3}>
                    {selectedCourse?.materials.map((material) => (
                      <ListItem
                        key={material.id}
                        p={3}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                      >
                        <HStack>
                          <ListIcon as={DownloadIcon} color="blue.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{material.title}</Text>
                            <Text fontSize="sm" color="gray.500">
                              Uploaded on {formatDate(material.uploadedAt)}
                            </Text>
                          </VStack>
                          <Spacer />
                          <Button
                            size="sm"
                            leftIcon={<DownloadIcon />}
                            onClick={() => handleDownload(material)}
                          >
                            Download
                          </Button>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel>
                  <List spacing={3}>
                    {selectedCourse?.schedule?.map((session) => (
                      <ListItem
                        key={session.id}
                        p={3}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                      >
                        <HStack>
                          <ListIcon
                            as={session.status === 'completed' ? CheckCircleIcon : TimeIcon}
                            color={session.status === 'completed' ? 'green.500' : 'blue.500'}
                          />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{session.topic}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {formatDate(session.date)}
                            </Text>
                          </VStack>
                          <Spacer />
                          <Badge
                            colorScheme={
                              session.status === 'completed'
                                ? 'green'
                                : session.status === 'upcoming'
                                ? 'blue'
                                : 'gray'
                            }
                          >
                            {session.status}
                          </Badge>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CoursesEnrolled; 