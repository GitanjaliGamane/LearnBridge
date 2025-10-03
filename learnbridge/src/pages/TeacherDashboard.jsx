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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from './teacher/Profile';
import Availability from './teacher/Availability';
import Credentials from './teacher/Credentials';
import Courses from './teacher/Courses';
import Bookings from './teacher/Bookings';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data for teacher profile
  const mockTeacherData = {
    name: user?.name || 'John Smith',
    photo: user?.photo || 'https://randomuser.me/api/portraits/men/32.jpg',
    subjects: user?.subjects || ['Mathematics', 'Physics', 'Chemistry'],
    experience: user?.experience || '5 years',
    languages: user?.languages || ['English', 'Spanish'],
    bio: user?.bio || 'Experienced teacher specializing in STEM subjects with a passion for making complex concepts accessible to students.',
    totalStudents: 24,
    activeSessions: 8,
    pendingRequests: 3,
    completedSessions: 42,
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={8}>
          {/* Main Content */}
          <Box>
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Profile</Tab>
                <Tab>Availability</Tab>
                <Tab>Credentials</Tab>
                <Tab>Courses</Tab>
                <Tab>Bookings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Heading size="lg" mb={6}>
                    Welcome, {mockTeacherData.name}!
                  </Heading>
                  <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Text>
                          <strong>Quick Stats</strong>
                        </Text>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {mockTeacherData.totalStudents}
                            </Text>
                            <Text>Total Students</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {mockTeacherData.activeSessions}
                            </Text>
                            <Text>Active Sessions</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {mockTeacherData.pendingRequests}
                            </Text>
                            <Text>Pending Requests</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {mockTeacherData.completedSessions}
                            </Text>
                            <Text>Completed Sessions</Text>
                          </Box>
                        </Grid>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card mt={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <CardHeader>
                      <Heading size="md">Recent Activity</Heading>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Activity</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Today</Td>
                            <Td>New booking request from Sarah Johnson</Td>
                            <Td>
                              <Badge colorScheme="yellow">Pending</Badge>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>Yesterday</Td>
                            <Td>Completed session with Michael Brown</Td>
                            <Td>
                              <Badge colorScheme="green">Completed</Badge>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>2 days ago</Td>
                            <Td>New student enrolled in Advanced Mathematics</Td>
                            <Td>
                              <Badge colorScheme="blue">Enrolled</Badge>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>3 days ago</Td>
                            <Td>Credential verification completed</Td>
                            <Td>
                              <Badge colorScheme="green">Verified</Badge>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </TabPanel>

                <TabPanel>
                  <Profile />
                </TabPanel>

                <TabPanel>
                  <Availability />
                </TabPanel>

                <TabPanel>
                  <Credentials />
                </TabPanel>

                <TabPanel>
                  <Courses />
                </TabPanel>

                <TabPanel>
                  <Bookings />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Sidebar */}
          <Box>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Your Profile</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  <Avatar size="xl" name={mockTeacherData.name} src={mockTeacherData.photo} />
                  <Text fontSize="lg" fontWeight="bold">
                    {mockTeacherData.name}
                  </Text>
                  <Text>Subjects: {mockTeacherData.subjects.join(', ')}</Text>
                  <Text>Experience: {mockTeacherData.experience}</Text>
                  <Text>Languages: {mockTeacherData.languages.join(', ')}</Text>
                  <Button
                    as={RouterLink}
                    to="/teacher/edit-profile"
                    colorScheme="blue"
                    width="100%"
                  >
                    Edit Profile
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <Card
              mt={6}
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardHeader>
                <Heading size="md">Quick Actions</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3} align="stretch">
                  <Button
                    as={RouterLink}
                    to="/teacher/chat-room"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Chat with Students
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/teacher/credentials"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Upload Credentials
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/teacher/courses"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Manage Courses
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherDashboard; 