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
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { SearchIcon, StarIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const ManageCourses = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with actual API calls
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    status: '',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setCourses([
      {
        id: 1,
        title: 'Advanced Mathematics',
        tutor: {
          id: 1,
          name: 'John Doe',
          avatar: null,
        },
        subject: 'Mathematics',
        price: 50,
        status: 'active',
        isFeatured: true,
        rating: 4.8,
        totalStudents: 45,
        createdAt: '2024-03-15',
      },
      {
        id: 2,
        title: 'Physics Fundamentals',
        tutor: {
          id: 2,
          name: 'Jane Smith',
          avatar: null,
        },
        subject: 'Physics',
        price: 45,
        status: 'pending',
        isFeatured: false,
        rating: 0,
        totalStudents: 0,
        createdAt: '2024-04-01',
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleFeatured = (courseId) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, isFeatured: !course.isFeatured }
          : course
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'hidden':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      course.tutor.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSubject = !filters.subject || course.subject === filters.subject;
    const matchesStatus = !filters.status || course.status === filters.status;
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
                placeholder="Search courses..."
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
              <option value="hidden">Hidden</option>
            </Select>
          </Flex>
        </CardBody>
      </Card>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course</Th>
              <Th>Tutor</Th>
              <Th>Subject</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Rating</Th>
              <Th>Students</Th>
              <Th>Featured</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCourses.map((course) => (
              <Tr key={course.id}>
                <Td>
                  <Text fontWeight="medium">{course.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Created: {new Date(course.createdAt).toLocaleDateString()}
                  </Text>
                </Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={course.tutor.name} src={course.tutor.avatar} />
                    <Text>{course.tutor.name}</Text>
                  </HStack>
                </Td>
                <Td>{course.subject}</Td>
                <Td>${course.price}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack>
                    <StarIcon color="yellow.400" />
                    <Text>{course.rating.toFixed(1)}</Text>
                  </HStack>
                </Td>
                <Td>{course.totalStudents}</Td>
                <Td>
                  <Switch
                    isChecked={course.isFeatured}
                    onChange={() => handleToggleFeatured(course.id)}
                    colorScheme="green"
                  />
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="Edit Course">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        leftIcon={<EditIcon />}
                        onClick={() => onAction('edit', course)}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    {course.status === 'active' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => onAction('hide', course)}
                      >
                        Hide
                      </Button>
                    )}
                    {course.status === 'hidden' && (
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        onClick={() => onAction('unhide', course)}
                      >
                        Unhide
                      </Button>
                    )}
                    <Tooltip label="Delete Course">
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        leftIcon={<DeleteIcon />}
                        onClick={() => onAction('delete', course)}
                      >
                        Delete
                      </Button>
                    </Tooltip>
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

export default ManageCourses; 