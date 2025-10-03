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
  Flex,
  Icon,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaVideo, 
  FaUserFriends, 
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { useState } from 'react';

const BookSession = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data for tutor
  const tutor = {
    id: parseInt(tutorId),
    name: 'John Smith',
    subjects: 'Mathematics, Physics',
    rating: 4.8,
    experience: '5 years',
    location: 'New York',
    hourlyRate: 30,
    bio: 'Experienced tutor specializing in mathematics and physics.',
    availability: 'Mon-Fri, 9AM-5PM',
    mode: 'both',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availabilityHours: {
      Monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    }
  };

  // State for booking form
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    duration: 60,
    mode: 'online',
    subject: '',
    sessionType: 'one-time',
    notes: '',
  });

  // Mock data for session types
  const sessionTypes = [
    {
      id: 'one-time',
      name: 'One-time Session',
      price: tutor.hourlyRate,
      duration: '60 minutes',
      description: 'Perfect for specific topics or exam preparation'
    },
    {
      id: 'package-5',
      name: 'Package of 5 Sessions',
      price: tutor.hourlyRate * 5 * 0.9, // 10% discount
      duration: '5 x 60 minutes',
      description: 'Save 10% with this package'
    },
    {
      id: 'package-10',
      name: 'Package of 10 Sessions',
      price: tutor.hourlyRate * 10 * 0.8, // 20% discount
      duration: '10 x 60 minutes',
      description: 'Save 20% with this package'
    }
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    const selectedSessionType = sessionTypes.find(type => type.id === bookingDetails.sessionType);
    if (!selectedSessionType) return 0;
    
    if (bookingDetails.sessionType === 'one-time') {
      return selectedSessionType.price * (bookingDetails.duration / 60);
    }
    return selectedSessionType.price;
  };

  // Handle booking submission
  const handleBooking = () => {
    // In a real application, this would send the booking details to a backend
    console.log('Booking details:', bookingDetails);
    
    // Show success message
    toast({
      title: 'Booking Successful',
      description: 'Your session has been booked successfully!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Navigate to bookings page
    navigate('/my-bookings');
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!bookingDetails.date) return [];
    
    const day = new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long' });
    return tutor.availabilityHours[day] || [];
  };
    
    return (
    <Box pt={20}>
      <Container maxW="1200px">
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Booking Form */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Book a Session</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Session Type */}
                <FormControl>
                  <FormLabel>Session Type</FormLabel>
                  <RadioGroup
                    value={bookingDetails.sessionType}
                    onChange={(value) => handleInputChange('sessionType', value)}
                  >
                    <Stack direction="row" spacing={4}>
                      {sessionTypes.map((type) => (
                        <Radio key={type.id} value={type.id}>
                          {type.name}
                        </Radio>
          ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {/* Date and Time */}
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={bookingDetails.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Time</FormLabel>
                    <Select
                      value={bookingDetails.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      placeholder="Select time"
                      isDisabled={!bookingDetails.date}
                    >
                      {getAvailableTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Duration */}
                <FormControl>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <NumberInput
                    min={30}
                    max={180}
                    step={30}
                    value={bookingDetails.duration}
                    onChange={(value) => handleInputChange('duration', parseInt(value))}
                    isDisabled={bookingDetails.sessionType !== 'one-time'}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                {/* Mode */}
                <FormControl>
                  <FormLabel>Mode</FormLabel>
                  <RadioGroup
                    value={bookingDetails.mode}
                    onChange={(value) => handleInputChange('mode', value)}
          >
                    <Stack direction="row" spacing={4}>
                      <Radio value="online">Online</Radio>
                      <Radio value="offline">Offline</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {/* Subject */}
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    value={bookingDetails.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Select subject"
                  >
                    {tutor.subjects.split(', ').map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* Notes */}
                <FormControl>
                  <FormLabel>Additional Notes</FormLabel>
                  <Textarea
                    value={bookingDetails.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any specific topics or areas you'd like to focus on?"
                  />
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={onOpen}
                  isDisabled={!bookingDetails.date || !bookingDetails.time || !bookingDetails.subject}
                >
                  Book Now
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Tutor Info and Price Summary */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} position="sticky" top="100px">
            <CardHeader>
              <Heading size="md">Session Summary</Heading>
            </CardHeader>
            <CardBody>
          <VStack spacing={6} align="stretch">
                {/* Tutor Info */}
                <HStack spacing={4}>
                  <Avatar
                    size="lg"
                    name={tutor.name}
                    src={tutor.image}
                  />
                  <VStack align="start" spacing={1}>
                    <Heading size="sm">{tutor.name}</Heading>
                    <Text color="gray.500">{tutor.subjects}</Text>
                    <Badge colorScheme="blue">{tutor.rating} ★</Badge>
          </VStack>
                  </HStack>
                  
                <Divider />

                {/* Price Summary */}
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text>Session Type:</Text>
                    <Text fontWeight="bold">
                      {sessionTypes.find(type => type.id === bookingDetails.sessionType)?.name}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Duration:</Text>
                    <Text fontWeight="bold">
                      {bookingDetails.sessionType === 'one-time' 
                        ? `${bookingDetails.duration} minutes`
                        : sessionTypes.find(type => type.id === bookingDetails.sessionType)?.duration}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Mode:</Text>
                    <Text fontWeight="bold">
                      {bookingDetails.mode.charAt(0).toUpperCase() + bookingDetails.mode.slice(1)}
                    </Text>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="lg">Total:</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      ${calculateTotal()}
                    </Text>
                  </HStack>
                </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

        {/* Confirmation Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirm Booking</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text>Please review your booking details:</Text>
                <VStack align="start" spacing={2}>
                  <Text><strong>Date:</strong> {bookingDetails.date}</Text>
                  <Text><strong>Time:</strong> {bookingDetails.time}</Text>
                  <Text><strong>Duration:</strong> {bookingDetails.duration} minutes</Text>
                  <Text><strong>Mode:</strong> {bookingDetails.mode}</Text>
                  <Text><strong>Subject:</strong> {bookingDetails.subject}</Text>
                  <Text><strong>Total:</strong> ${calculateTotal()}</Text>
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleBooking}>
                Confirm Booking
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      </Container>
    </Box>
  );
};

export default BookSession; 