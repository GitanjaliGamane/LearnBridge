import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
  Flex,
  Text,
  Avatar,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  VStack,
  Link,
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon, StarIcon, TimeIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const ReportsAnalytics = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    monthlyActiveUsers: 0,
    monthlyBookings: 0,
    monthlyRevenue: 0,
    growthRate: 0,
  });
  const [topTutors, setTopTutors] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [filters, setFilters] = useState({
    period: 'month', // week, month, year
    metric: 'bookings', // bookings, revenue, users
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setStats({
      monthlyActiveUsers: 1500,
      monthlyBookings: 2500,
      monthlyRevenue: 75000,
      growthRate: 12.5,
    });

    setTopTutors([
      {
        id: 1,
        name: 'John Doe',
        avatar: null,
        subject: 'Mathematics',
        rating: 4.9,
        students: 150,
        bookings: 450,
        revenue: 22500,
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: null,
        subject: 'Physics',
        rating: 4.8,
        students: 120,
        bookings: 360,
        revenue: 18000,
      },
      // Add more mock data as needed
    ]);

    setTopCourses([
      {
        id: 1,
        title: 'Advanced Mathematics',
        tutor: 'John Doe',
        subject: 'Mathematics',
        rating: 4.9,
        students: 150,
        bookings: 450,
        revenue: 22500,
      },
      {
        id: 2,
        title: 'Physics Fundamentals',
        tutor: 'Jane Smith',
        subject: 'Physics',
        rating: 4.8,
        students: 120,
        bookings: 360,
        revenue: 18000,
      },
      // Add more mock data as needed
    ]);

    setPeakHours([
      { hour: '9:00', bookings: 45 },
      { hour: '10:00', bookings: 60 },
      { hour: '11:00', bookings: 75 },
      { hour: '12:00', bookings: 50 },
      { hour: '13:00', bookings: 40 },
      { hour: '14:00', bookings: 65 },
      { hour: '15:00', bookings: 85 },
      { hour: '16:00', bookings: 90 },
      { hour: '17:00', bookings: 70 },
      { hour: '18:00', bookings: 55 },
      { hour: '19:00', bookings: 45 },
      { hour: '20:00', bookings: 35 },
    ]);

    setGrowthData([
      { month: 'Jan', users: 500, bookings: 800, revenue: 24000 },
      { month: 'Feb', users: 600, bookings: 950, revenue: 28500 },
      { month: 'Mar', users: 750, bookings: 1200, revenue: 36000 },
      { month: 'Apr', users: 900, bookings: 1500, revenue: 45000 },
      { month: 'May', users: 1100, bookings: 1800, revenue: 54000 },
      { month: 'Jun', users: 1300, bookings: 2100, revenue: 63000 },
      { month: 'Jul', users: 1500, bookings: 2500, revenue: 75000 },
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleExport = (type, format) => {
    // TODO: Implement export functionality
    console.log(`Exporting ${type} report in ${format} format...`);
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Monthly Active Users</StatLabel>
              <StatNumber>{stats.monthlyActiveUsers.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatNumber fontSize="sm" color={stats.growthRate >= 0 ? 'green.500' : 'red.500'}>
                  {stats.growthRate >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {Math.abs(stats.growthRate)}%
                </StatNumber>
                from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Monthly Bookings</StatLabel>
              <StatNumber>{stats.monthlyBookings.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatNumber fontSize="sm" color={stats.growthRate >= 0 ? 'green.500' : 'red.500'}>
                  {stats.growthRate >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {Math.abs(stats.growthRate)}%
                </StatNumber>
                from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Monthly Revenue</StatLabel>
              <StatNumber>${stats.monthlyRevenue.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatNumber fontSize="sm" color={stats.growthRate >= 0 ? 'green.500' : 'red.500'}>
                  {stats.growthRate >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {Math.abs(stats.growthRate)}%
                </StatNumber>
                from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Platform Growth</StatLabel>
              <StatNumber>{stats.growthRate}%</StatNumber>
              <StatHelpText>Month over month</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
            <Select
              placeholder="Select period"
              value={filters.period}
              onChange={(e) => handleFilterChange('period', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="year">Last 12 months</option>
            </Select>

            <Select
              placeholder="Select metric"
              value={filters.metric}
              onChange={(e) => handleFilterChange('metric', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="bookings">Bookings</option>
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
            </Select>

            <HStack spacing={2} ml="auto">
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="blue"
                variant="outline"
                onClick={() => handleExport('activity', 'excel')}
              >
                Export Excel
              </Button>
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="red"
                variant="outline"
                onClick={() => handleExport('activity', 'pdf')}
              >
                Export PDF
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      <Tabs>
        <TabList>
          <Tab>Top Performers</Tab>
          <Tab>Peak Hours</Tab>
          <Tab>Growth Trends</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Top Tutors</Tab>
                <Tab>Top Courses</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box overflowX="auto">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Tutor</Th>
                          <Th>Subject</Th>
                          <Th>Rating</Th>
                          <Th>Students</Th>
                          <Th>Bookings</Th>
                          <Th>Revenue</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {topTutors.map((tutor) => (
                          <Tr key={tutor.id}>
                            <Td>
                              <HStack>
                                <Avatar size="sm" name={tutor.name} src={tutor.avatar} />
                                <Text>{tutor.name}</Text>
                              </HStack>
                            </Td>
                            <Td>{tutor.subject}</Td>
                            <Td>
                              <HStack>
                                <StarIcon color="yellow.400" />
                                <Text>{tutor.rating.toFixed(1)}</Text>
                              </HStack>
                            </Td>
                            <Td>{tutor.students}</Td>
                            <Td>{tutor.bookings}</Td>
                            <Td>${tutor.revenue.toLocaleString()}</Td>
                            <Td>
                              <Link href={`/admin/tutors/${tutor.id}`}>
                                <Button size="sm" colorScheme="blue" variant="outline">
                                  View Profile
                                </Button>
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <Box overflowX="auto">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Course</Th>
                          <Th>Tutor</Th>
                          <Th>Subject</Th>
                          <Th>Rating</Th>
                          <Th>Students</Th>
                          <Th>Bookings</Th>
                          <Th>Revenue</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {topCourses.map((course) => (
                          <Tr key={course.id}>
                            <Td>{course.title}</Td>
                            <Td>{course.tutor}</Td>
                            <Td>{course.subject}</Td>
                            <Td>
                              <HStack>
                                <StarIcon color="yellow.400" />
                                <Text>{course.rating.toFixed(1)}</Text>
                              </HStack>
                            </Td>
                            <Td>{course.students}</Td>
                            <Td>{course.bookings}</Td>
                            <Td>${course.revenue.toLocaleString()}</Td>
                            <Td>
                              <Link href={`/admin/courses/${course.id}`}>
                                <Button size="sm" colorScheme="blue" variant="outline">
                                  View Course
                                </Button>
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Heading size="md" mb={4}>Peak Booking Hours</Heading>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Hour</Th>
                        <Th>Bookings</Th>
                        <Th>Percentage</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {peakHours.map((hour) => {
                        const totalBookings = peakHours.reduce((sum, h) => sum + h.bookings, 0);
                        const percentage = ((hour.bookings / totalBookings) * 100).toFixed(1);
                        return (
                          <Tr key={hour.hour}>
                            <Td>{hour.hour}</Td>
                            <Td>{hour.bookings}</Td>
                            <Td>{percentage}%</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Heading size="md" mb={4}>Platform Growth</Heading>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Month</Th>
                        <Th>Users</Th>
                        <Th>Bookings</Th>
                        <Th>Revenue</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {growthData.map((data) => (
                        <Tr key={data.month}>
                          <Td>{data.month}</Td>
                          <Td>{data.users}</Td>
                          <Td>{data.bookings}</Td>
                          <Td>${data.revenue.toLocaleString()}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ReportsAnalytics; 