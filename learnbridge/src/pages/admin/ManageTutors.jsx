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
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const ManageTutors = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    status: '',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setTutors([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        subjects: ['Mathematics', 'Physics'],
        location: 'New York',
        status: 'active',
        rating: 4.8,
        totalStudents: 45,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        subjects: ['Chemistry', 'Biology'],
        location: 'Los Angeles',
        status: 'pending',
        rating: 0,
        totalStudents: 0,
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log('Exporting tutor data...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      tutor.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSubject = !filters.subject || tutor.subjects.includes(filters.subject);
    const matchesStatus = !filters.status || tutor.status === filters.status;
    return matchesSearch && matchesSubject && matchesStatus;
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
                placeholder="Search tutors..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="Filter by subject"
              value={filters.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </Select>

            <Select
              placeholder="Filter by status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
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
              <Th>Tutor</Th>
              <Th>Subjects</Th>
              <Th>Location</Th>
              <Th>Status</Th>
              <Th>Rating</Th>
              <Th>Students</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTutors.map((tutor) => (
              <Tr key={tutor.id}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={tutor.name} />
                    <Box>
                      <Text fontWeight="medium">{tutor.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {tutor.email}
                      </Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{tutor.subjects.join(', ')}</Td>
                <Td>{tutor.location}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(tutor.status)}>
                    {tutor.status}
                  </Badge>
                </Td>
                <Td>{tutor.rating.toFixed(1)}</Td>
                <Td>{tutor.totalStudents}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => onAction('view', tutor)}
                    >
                      View
                    </Button>
                    {tutor.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => onAction('approve', tutor)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => onAction('reject', tutor)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {tutor.status === 'active' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => onAction('suspend', tutor)}
                      >
                        Suspend
                      </Button>
                    )}
                    {tutor.status === 'suspended' && (
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => onAction('reactivate', tutor)}
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

export default ManageTutors; 