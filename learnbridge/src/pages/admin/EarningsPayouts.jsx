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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Textarea,
  Link,
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const EarningsPayouts = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [payoutNote, setPayoutNote] = useState('');

  // Mock data - replace with actual API calls
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayouts: 0,
    completedPayouts: 0,
    commissionRate: 0.15, // 15% platform commission
  });
  const [payouts, setPayouts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: '30days', // 7days, 30days, 90days, custom
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setEarnings({
      totalEarnings: 25000,
      pendingPayouts: 5000,
      completedPayouts: 20000,
      commissionRate: 0.15,
    });

    setPayouts([
      {
        id: 1,
        tutor: {
          id: 1,
          name: 'John Doe',
          avatar: null,
          email: 'john@example.com',
        },
        amount: 1500,
        commission: 225,
        netAmount: 1275,
        status: 'pending',
        date: '2024-04-15',
        period: 'March 2024',
        transactions: 25,
      },
      {
        id: 2,
        tutor: {
          id: 2,
          name: 'Jane Smith',
          avatar: null,
          email: 'jane@example.com',
        },
        amount: 2000,
        commission: 300,
        netAmount: 1700,
        status: 'completed',
        date: '2024-04-10',
        period: 'March 2024',
        transactions: 30,
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleInitiatePayout = (payout) => {
    setSelectedPayout(payout);
    setPayoutNote('');
    onOpen();
  };

  const handleConfirmPayout = () => {
    // TODO: Implement API call to process payout
    onAction('processPayout', { ...selectedPayout, note: payoutNote });
    onClose();
  };

  const handleExport = (format) => {
    // TODO: Implement export functionality
    console.log(`Exporting ${format} report...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'completed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch = 
      payout.tutor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      payout.tutor.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || payout.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Platform Earnings</StatLabel>
              <StatNumber>${earnings.totalEarnings.toLocaleString()}</StatNumber>
              <StatHelpText>All time</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Pending Payouts</StatLabel>
              <StatNumber>${earnings.pendingPayouts.toLocaleString()}</StatNumber>
              <StatHelpText>Awaiting processing</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Completed Payouts</StatLabel>
              <StatNumber>${earnings.completedPayouts.toLocaleString()}</StatNumber>
              <StatHelpText>Successfully processed</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Platform Commission</StatLabel>
              <StatNumber>{(earnings.commissionRate * 100).toFixed(1)}%</StatNumber>
              <StatHelpText>Per transaction</StatHelpText>
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
                placeholder="Search payouts..."
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
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Select>

            <Select
              placeholder="Date range"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="custom">Custom range</option>
            </Select>

            <HStack spacing={2} ml="auto">
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="blue"
                variant="outline"
                onClick={() => handleExport('excel')}
              >
                Export Excel
              </Button>
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="red"
                variant="outline"
                onClick={() => handleExport('pdf')}
              >
                Export PDF
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tutor</Th>
              <Th>Period</Th>
              <Th>Transactions</Th>
              <Th>Gross Amount</Th>
              <Th>Commission</Th>
              <Th>Net Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPayouts.map((payout) => (
              <Tr key={payout.id}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={payout.tutor.name} src={payout.tutor.avatar} />
                    <Box>
                      <Text fontWeight="medium">{payout.tutor.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {payout.tutor.email}
                      </Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{payout.period}</Td>
                <Td>{payout.transactions}</Td>
                <Td>${payout.amount.toLocaleString()}</Td>
                <Td>${payout.commission.toLocaleString()}</Td>
                <Td>${payout.netAmount.toLocaleString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(payout.status)}>
                    {payout.status}
                  </Badge>
                </Td>
                <Td>{new Date(payout.date).toLocaleDateString()}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="View Tutor Profile">
                      <Link href={`/admin/tutors/${payout.tutor.id}`} isExternal>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="outline"
                          leftIcon={<ExternalLinkIcon />}
                        >
                          View
                        </Button>
                      </Link>
                    </Tooltip>
                    {payout.status === 'pending' && (
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        onClick={() => handleInitiatePayout(payout)}
                      >
                        Process
                      </Button>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Process Payout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text>
                Processing payout for {selectedPayout?.tutor.name} - ${selectedPayout?.netAmount.toLocaleString()}
              </Text>
              
              <FormControl>
                <FormLabel>Payment Method</FormLabel>
                <Select placeholder="Select payment method">
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Payment Details</FormLabel>
                <Input placeholder="Account number or email" />
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  placeholder="Add any notes about this payout"
                  value={payoutNote}
                  onChange={(e) => setPayoutNote(e.target.value)}
                />
              </FormControl>

              <Button
                colorScheme="green"
                onClick={handleConfirmPayout}
                width="100%"
              >
                Confirm Payout
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EarningsPayouts; 