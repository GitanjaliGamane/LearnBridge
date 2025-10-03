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
  Spacer,
  Text,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon, StarIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const ManageStudents = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    activity: '',
    status: '',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setStudents([
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        grade: '10th',
        status: 'active',
        totalBookings: 25,
        lastActive: '2024-04-05',
        rating: 4.5,
        feedback: 'Great experience with tutors',
      },
      {
        id: 2,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        grade: '11th',
        status: 'inactive',
        totalBookings: 5,
        lastActive: '2024-03-15',
        rating: 3.8,
        feedback: 'Good platform, helpful tutors',
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log('Exporting student data...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'gray';
      case 'suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesActivity = !filters.activity || student.status === filters.activity;
    const matchesStatus = !filters.status || student.status === filters.status;
    return matchesSearch && matchesActivity && matchesStatus;
  });

  return (
    <Box>
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <InputGroup maxW={{ base: '100%', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search students..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="Filter by activity"
              value={filters.activity}
              onChange={(e) => handleFilterChange('activity', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>

            <Select
              placeholder="Filter by status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </Select>

            <Spacer />

            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="blue"
              variant="outline"
              onClick={handleExport}
            >
              Export
            </Button>
          </Flex>
        </CardBody>
      </Card>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Grade</Th>
              <Th>Status</Th>
              <Th>Bookings</Th>
              <Th>Last Active</Th>
              <Th>Rating</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.map((student) => (
              <Tr key={student.id}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={student.name} />
                    <Box>
                      <Text fontWeight="medium">{student.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {student.email}
                      </Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{student.grade}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </Td>
                <Td>{student.totalBookings}</Td>
                <Td>{new Date(student.lastActive).toLocaleDateString()}</Td>
                <Td>
                  <HStack>
                    <StarIcon color="yellow.400" />
                    <Text>{student.rating.toFixed(1)}</Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => onAction('view', student)}
                    >
                      View
                    </Button>
                    <Tooltip label={student.feedback}>
                      <Button
                        size="sm"
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => onAction('feedback', student)}
                      >
                        Feedback
                      </Button>
                    </Tooltip>
                    {student.status === 'active' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => onAction('suspend', student)}
                      >
                        Suspend
                      </Button>
                    )}
                    {student.status === 'suspended' && (
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => onAction('reactivate', student)}
                      >
                        Reactivate
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

export default ManageStudents; 