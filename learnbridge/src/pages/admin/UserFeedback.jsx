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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  VStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
} from '@chakra-ui/react';
import { SearchIcon, ViewIcon, CheckIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const UserFeedback = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mock data - replace with actual API calls
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inReview: 0,
    escalated: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setStats({
      total: 150,
      resolved: 100,
      inReview: 35,
      escalated: 15,
    });

    setFeedback([
      {
        id: 1,
        user: {
          id: 1,
          name: 'John Doe',
          avatar: null,
          type: 'student',
        },
        type: 'complaint',
        subject: 'Booking Issue',
        message: 'Unable to book a session with my preferred tutor.',
        status: 'in_review',
        date: '2024-03-15T10:30:00Z',
        priority: 'high',
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Jane Smith',
          avatar: null,
          type: 'tutor',
        },
        type: 'feedback',
        subject: 'Platform Suggestion',
        message: 'Would be great to have a calendar integration feature.',
        status: 'resolved',
        date: '2024-03-14T15:45:00Z',
        priority: 'medium',
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    onOpen();
  };

  const handleStatusChange = (feedbackId, newStatus) => {
    // TODO: Implement API call to update status
    setFeedback((prev) =>
      prev.map((f) =>
        f.id === feedbackId
          ? {
              ...f,
              status: newStatus,
            }
          : f
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'green';
      case 'in_review':
        return 'yellow';
      case 'escalated':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'complaint':
        return 'red';
      case 'feedback':
        return 'blue';
      case 'suggestion':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const filteredFeedback = feedback.filter((f) => {
    const matchesSearch =
      f.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
      f.message.toLowerCase().includes(filters.search.toLowerCase()) ||
      f.user.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || f.type === filters.type;
    const matchesStatus = filters.status === 'all' || f.status === filters.status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Feedback</StatLabel>
              <StatNumber>{stats.total}</StatNumber>
              <StatHelpText>All time</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Resolved</StatLabel>
              <StatNumber>{stats.resolved}</StatNumber>
              <StatHelpText>Successfully addressed</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>In Review</StatLabel>
              <StatNumber>{stats.inReview}</StatNumber>
              <StatHelpText>Being processed</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Escalated</StatLabel>
              <StatNumber>{stats.escalated}</StatNumber>
              <StatHelpText>Requires attention</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
            <InputGroup maxW={{ base: '100%', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search feedback..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="Type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="all">All Types</option>
              <option value="complaint">Complaints</option>
              <option value="feedback">Feedback</option>
              <option value="suggestion">Suggestions</option>
            </Select>

            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="all">All Status</option>
              <option value="resolved">Resolved</option>
              <option value="in_review">In Review</option>
              <option value="escalated">Escalated</option>
            </Select>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Type</Th>
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Priority</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredFeedback.map((f) => (
                  <Tr key={f.id}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={f.user.name} src={f.user.avatar} />
                        <VStack align="start" spacing={0}>
                          <Text>{f.user.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {f.user.type}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={getTypeColor(f.type)}>
                        {f.type.charAt(0).toUpperCase() + f.type.slice(1)}
                      </Badge>
                    </Td>
                    <Td>{f.subject}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(f.status)}>
                        {f.status.replace('_', ' ').charAt(0).toUpperCase() + f.status.slice(1)}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={getPriorityColor(f.priority)}>
                        {f.priority.charAt(0).toUpperCase() + f.priority.slice(1)}
                      </Badge>
                    </Td>
                    <Td>{new Date(f.date).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          leftIcon={<ViewIcon />}
                          onClick={() => handleViewFeedback(f)}
                        >
                          View
                        </Button>
                        {f.status !== 'resolved' && (
                          <Button
                            size="sm"
                            colorScheme="green"
                            leftIcon={<CheckIcon />}
                            onClick={() => handleStatusChange(f.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        )}
                        {f.status !== 'escalated' && (
                          <Button
                            size="sm"
                            colorScheme="red"
                            leftIcon={<WarningIcon />}
                            onClick={() => handleStatusChange(f.id, 'escalated')}
                          >
                            Escalate
                          </Button>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feedback Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedFeedback && (
              <VStack align="stretch" spacing={4}>
                <HStack>
                  <Avatar size="md" name={selectedFeedback.user.name} src={selectedFeedback.user.avatar} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{selectedFeedback.user.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {selectedFeedback.user.type}
                    </Text>
                  </VStack>
                </HStack>

                <Box>
                  <Text fontWeight="bold">Subject</Text>
                  <Text>{selectedFeedback.subject}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold">Message</Text>
                  <Text>{selectedFeedback.message}</Text>
                </Box>

                <HStack spacing={4}>
                  <Box>
                    <Text fontWeight="bold">Type</Text>
                    <Badge colorScheme={getTypeColor(selectedFeedback.type)}>
                      {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedFeedback.status)}>
                      {selectedFeedback.status.replace('_', ' ').charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Priority</Text>
                    <Badge colorScheme={getPriorityColor(selectedFeedback.priority)}>
                      {selectedFeedback.priority.charAt(0).toUpperCase() + selectedFeedback.priority.slice(1)}
                    </Badge>
                  </Box>
                </HStack>

                <Box>
                  <Text fontWeight="bold">Date</Text>
                  <Text>{new Date(selectedFeedback.date).toLocaleString()}</Text>
                </Box>

                <HStack spacing={4} justify="flex-end">
                  {selectedFeedback.status !== 'resolved' && (
                    <Button
                      colorScheme="green"
                      leftIcon={<CheckIcon />}
                      onClick={() => {
                        handleStatusChange(selectedFeedback.id, 'resolved');
                        onClose();
                      }}
                    >
                      Mark as Resolved
                    </Button>
                  )}
                  {selectedFeedback.status !== 'escalated' && (
                    <Button
                      colorScheme="red"
                      leftIcon={<WarningIcon />}
                      onClick={() => {
                        handleStatusChange(selectedFeedback.id, 'escalated');
                        onClose();
                      }}
                    >
                      Escalate
                    </Button>
                  )}
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserFeedback; 