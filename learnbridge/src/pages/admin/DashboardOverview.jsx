import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const DashboardOverview = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    totalTutors: 0,
    totalStudents: 0,
    activeCourses: 0,
    weeklyBookings: 0,
    monthlyBookings: 0,
    newSignups: 0,
    platformEarnings: 0,
    earningsGrowth: 0,
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setStats({
      totalTutors: 150,
      totalStudents: 500,
      activeCourses: 75,
      weeklyBookings: 250,
      monthlyBookings: 1000,
      newSignups: 25,
      platformEarnings: 15000,
      earningsGrowth: 12.5,
    });
  }, []);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Tutors</StatLabel>
              <StatNumber>{stats.totalTutors}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Students</StatLabel>
              <StatNumber>{stats.totalStudents}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                9.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Active Courses</StatLabel>
              <StatNumber>{stats.activeCourses}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                7.00%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Platform Earnings</StatLabel>
              <StatNumber>${stats.platformEarnings}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {stats.earningsGrowth}%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">Booking Statistics</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={2} spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  This Week
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {stats.weeklyBookings}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  This Month
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {stats.monthlyBookings}
                </Text>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">New Signups</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="2xl" fontWeight="bold">
              {stats.newSignups}
            </Text>
            <Text fontSize="sm" color="gray.500">
              New tutor registration requests
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardOverview; 