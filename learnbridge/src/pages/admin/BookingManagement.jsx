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
} from '@chakra-ui/react';
import { SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const BookingManagement = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: '',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setBookings([
      {
        id: 1,
        student: {
          id: 1,
          name: 'Alice Johnson',
          avatar: null,
        },
        tutor: {
          id: 1,
          name: 'John Doe',
          avatar: null,
        },
        course: 'Advanced Mathematics',
        subject: 'Mathematics',
        status: 'active',
        date: '2024-04-15',
        time: '14:00',
        duration: 60,
        price: 50,
        rating: 4.5,
      },
      {
        id: 2,
        student: {
          id: 2,
          name: 'Bob Smith',
          avatar: null,
        },
        tutor: {
          id: 2,
          name: 'Jane Smith',
          avatar: null,
        },
        course: 'Physics Fundamentals',
        subject: 'Physics',
        status: 'completed',
        date: '2024-04-14',
        time: '15:30',
        duration: 90,
        price: 45,
        rating: 5.0,
      },
      // Add more mock data as needed
    ]);

    // Set mock stats
    setStats({
      totalBookings: 150,
      activeBookings: 45,
      completedBookings: 100,
      cancelledBookings: 5,
    });
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      case 'cancelled':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.tutor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.course.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || booking.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Bookings</StatLabel>
              <StatNumber>{stats.totalBookings}</StatNumber>
              <StatHelpText>All time</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Active Bookings</StatLabel>
              <StatNumber>{stats.activeBookings}</StatNumber>
              <StatHelpText>Currently ongoing</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Completed Bookings</StatLabel>
              <StatNumber>{stats.completedBookings}</StatNumber>
              <StatHelpText>Successfully completed</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Cancelled Bookings</StatLabel>
              <StatNumber>{stats.cancelledBookings}</StatNumber>
              <StatHelpText>Cancelled or refunded</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <InputGroup maxW={{ base: '100%', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search bookings..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="Filter by status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </Select>
          </Flex>
        </CardBody>
      </Card>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Booking Details</Th>
              <Th>Student</Th>
              <Th>Tutor</Th>
              <Th>Course</Th>
              <Th>Date & Time</Th>
              <Th>Duration</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Rating</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr key={booking.id}>
                <Td>
                  <Text fontWeight="medium">Booking #{booking.id}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {booking.subject}
                  </Text>
                </Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={booking.student.name} src={booking.student.avatar} />
                    <Text>{booking.student.name}</Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={booking.tutor.name} src={booking.tutor.avatar} />
                    <Text>{booking.tutor.name}</Text>
                  </HStack>
                </Td>
                <Td>{booking.course}</Td>
                <Td>
                  <Text>{new Date(booking.date).toLocaleDateString()}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {booking.time}
                  </Text>
                </Td>
                <Td>{booking.duration} mins</Td>
                <Td>${booking.price}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </Td>
                <Td>
                  {booking.rating ? (
                    <HStack>
                      <StarIcon color="yellow.400" />
                      <Text>{booking.rating.toFixed(1)}</Text>
                    </HStack>
                  ) : (
                    <Text color="gray.500">-</Text>
                  )}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="View Details">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        leftIcon={<ViewIcon />}
                        onClick={() => onAction('view', booking)}
                      >
                        View
                      </Button>
                    </Tooltip>
                    {booking.status === 'active' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => onAction('cancel', booking)}
                      >
                        Cancel
                      </Button>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default BookingManagement; 