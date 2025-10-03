import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SimpleGrid,
  useBreakpointValue,
  Flex,
  Spacer,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const Bookings = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      course: 'Advanced Mathematics',
      date: '2024-04-10',
      time: '14:00',
      duration: 60,
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 50,
      notes: 'First session, focusing on calculus basics',
    },
    {
      id: 2,
      studentName: 'Michael Brown',
      course: 'Physics Fundamentals',
      date: '2024-04-11',
      time: '15:30',
      duration: 45,
      status: 'pending',
      paymentStatus: 'pending',
      amount: 45,
      notes: 'Review of thermodynamics concepts',
    },
    {
      id: 3,
      studentName: 'Emily Davis',
      course: 'Chemistry Basics',
      date: '2024-04-12',
      time: '10:00',
      duration: 45,
      status: 'cancelled',
      paymentStatus: 'refunded',
      amount: 40,
      notes: 'Student requested cancellation due to schedule conflict',
    },
    {
      id: 4,
      studentName: 'David Wilson',
      course: 'Biology Essentials',
      date: '2024-04-13',
      time: '16:00',
      duration: 60,
      status: 'completed',
      paymentStatus: 'paid',
      amount: 45,
      notes: 'Completed cell biology module',
    },
  ];
  
  const [bookings, setBookings] = useState(user?.bookings || mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });
  const containerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const cardSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // TODO: Implement API call to update booking status
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      toast({
        title: 'Status updated',
        description: `Booking status has been updated to ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating status',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'cancelled':
        return 'red';
      case 'completed':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'refunded':
        return 'red';
      default:
        return 'gray';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  // Render booking cards for mobile view
  const renderBookingCards = () => {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={cardSpacing}>
        {filteredBookings.map((booking) => (
          <Card key={booking.id} variant="outline" borderColor={borderColor}>
            <CardHeader>
              <Flex direction="column" gap={2}>
                <Heading size="md">{booking.studentName}</Heading>
                <HStack>
                  <Badge colorScheme={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <Badge colorScheme={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                </HStack>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={2}>
                <Text><strong>Course:</strong> {booking.course}</Text>
                <Text><strong>Date:</strong> {booking.date}</Text>
                <Text><strong>Time:</strong> {booking.time}</Text>
                <Text><strong>Duration:</strong> {booking.duration} minutes</Text>
                <Text><strong>Amount:</strong> ${booking.amount}</Text>
                <Text noOfLines={2}><strong>Notes:</strong> {booking.notes}</Text>
              </VStack>
            </CardBody>
            <CardFooter>
              <HStack spacing={2} width="100%" justify="flex-end">
                <Button 
                  size="sm" 
                  colorScheme="blue" 
                  variant="outline"
                  onClick={() => handleViewDetails(booking)}
                >
                  View
                </Button>
                {booking.status === 'pending' && (
                  <Button
                    size="sm"
                    colorScheme="green"
                    variant="outline"
                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                )}
                {booking.status === 'confirmed' && (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleStatusChange(booking.id, 'completed')}
                  >
                    Complete
                  </Button>
                )}
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  // Render booking table for desktop view
  const renderBookingTable = () => {
    return (
      <Box
        p={containerPadding}
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflowX="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Course</Th>
              <Th>Date & Time</Th>
              <Th>Duration</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr key={booking.id}>
                <Td>{booking.studentName}</Td>
                <Td>{booking.course}</Td>
                <Td>
                  {booking.date} at {booking.time}
                </Td>
                <Td>{booking.duration} minutes</Td>
                <Td>${booking.amount}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </Td>
                <Td>
                  <Badge colorScheme={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handleViewDetails(booking)}
                    >
                      View
                    </Button>
                    {booking.status === 'pending' && (
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => handleStatusChange(booking.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px" px={containerPadding}>
        <VStack spacing={8} align="stretch">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} gap={4}>
            <Heading size="lg">Bookings</Heading>
            <Select
              value={filter}
              onChange={handleFilterChange}
              width={{ base: "100%", md: "200px" }}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </Select>
          </Flex>

          {isMobile ? renderBookingCards() : renderBookingTable()}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedBooking && (
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Student Name</FormLabel>
                  <Input value={selectedBooking.studentName} isReadOnly />
                </FormControl>

                <FormControl>
                  <FormLabel>Course</FormLabel>
                  <Input value={selectedBooking.course} isReadOnly />
                </FormControl>

                <FormControl>
                  <FormLabel>Date & Time</FormLabel>
                  <Input
                    value={`${selectedBooking.date} at ${selectedBooking.time}`}
                    isReadOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    value={`${selectedBooking.duration} minutes`}
                    isReadOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input value={`$${selectedBooking.amount}`} isReadOnly />
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Input value={selectedBooking.status} isReadOnly />
                </FormControl>

                <FormControl>
                  <FormLabel>Payment Status</FormLabel>
                  <Input value={selectedBooking.paymentStatus} isReadOnly />
                </FormControl>

                <FormControl>
                  <FormLabel>Notes</FormLabel>
                  <Textarea value={selectedBooking.notes} isReadOnly />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Bookings; 