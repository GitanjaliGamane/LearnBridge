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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  ListIcon,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaGraduationCap, 
  FaBook, 
  FaClock, 
  FaMapMarkerAlt,
  FaVideo,
  FaUserFriends,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaRegStar,
  FaStarHalfAlt,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TutorProfile = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data for tutor with Indian context
  const tutor = {
    id: parseInt(tutorId),
    name: 'Rajesh Kumar',
    subjects: 'Mathematics, Physics',
    rating: 4.8,
    experience: '5 years',
    location: 'Mumbai, Maharashtra',
    hourlyRate: 800,
    bio: 'Experienced tutor specializing in mathematics and physics. I have a PhD in Physics from IIT Bombay and have been teaching for over 5 years. My teaching approach focuses on making complex concepts accessible and engaging for students of all levels.',
    availability: 'Mon-Fri, 9AM-5PM',
    mode: 'both',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    education: [
      {
        degree: 'PhD in Physics',
        university: 'Indian Institute of Technology Bombay',
        year: '2015-2019'
      },
      {
        degree: 'MSc in Mathematics',
        university: 'University of Delhi',
        year: '2013-2015'
      }
    ],
    expertise: [
      'Advanced Calculus',
      'Quantum Mechanics',
      'Classical Mechanics',
      'Linear Algebra',
      'Differential Equations'
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availabilityHours: {
      Monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    reviews: [
      {
        id: 1,
        studentName: 'Priya Sharma',
        rating: 5,
        comment: 'Rajesh sir is an amazing tutor! He explains complex physics concepts in a way that\'s easy to understand. His teaching methods are very effective.',
        date: '2023-12-15'
      },
      {
        id: 2,
        studentName: 'Amit Patel',
        rating: 4.5,
        comment: 'Great tutor with deep knowledge of mathematics. Very patient and helpful. His problem-solving approach is excellent.',
        date: '2023-11-20'
      },
      {
        id: 3,
        studentName: 'Neha Gupta',
        rating: 5,
        comment: 'Rajesh sir helped me improve my grades significantly. His teaching style is very engaging and he makes learning fun.',
        date: '2023-10-05'
      }
    ]
  };

  // Mock data for session types with Indian pricing
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

  const handleBookSession = () => {
    navigate(`/book-session/${tutor.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} as={FaStar} color="yellow.400" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" as={FaStarHalfAlt} color="yellow.400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} as={FaRegStar} color="yellow.400" />);
    }

    return stars;
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        {/* Tutor Header */}
        <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: 'auto 1fr' }} gap={6}>
              <Avatar
                size="2xl"
                name={tutor.name}
                src={tutor.image}
              />
              <VStack align="start" spacing={4}>
                <Box>
                  <Heading size="lg">{tutor.name}</Heading>
                  <HStack spacing={2} mt={1}>
                    <Badge colorScheme="blue">{tutor.rating} ★</Badge>
                    <Text color="gray.500">{tutor.experience} experience</Text>
                  </HStack>
                </Box>
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FaMapMarkerAlt} color="gray.500" />
                    <Text>{tutor.location}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaClock} color="gray.500" />
                    <Text>{tutor.availability}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={tutor.mode === 'online' ? FaVideo : FaUserFriends} color="gray.500" />
                    <Text>{tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}</Text>
                  </HStack>
                </HStack>
                <Text>{tutor.bio}</Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleBookSession}
                >
                  Book a Session
                </Button>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Availability</Tab>
            <Tab>Reviews</Tab>
            <Tab>Session Types</Tab>
          </TabList>

          <TabPanels>
            {/* About Tab */}
            <TabPanel>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <CardHeader>
                    <Heading size="md">Education</Heading>
                  </CardHeader>
                  <CardBody>
                    <List spacing={3}>
                      {tutor.education.map((edu, index) => (
                        <ListItem key={index}>
                          <ListIcon as={FaGraduationCap} color="blue.500" />
                          <Text fontWeight="bold">{edu.degree}</Text>
                          <Text>{edu.university}</Text>
                          <Text color="gray.500">{edu.year}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <CardHeader>
                    <Heading size="md">Areas of Expertise</Heading>
                  </CardHeader>
                  <CardBody>
                    <List spacing={3}>
                      {tutor.expertise.map((subject, index) => (
                        <ListItem key={index}>
                          <ListIcon as={FaBook} color="blue.500" />
                          {subject}
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>
              </Grid>
            </TabPanel>

            {/* Availability Tab */}
            <TabPanel>
              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Weekly Schedule</Heading>
                </CardHeader>
                <CardBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Day</Th>
                        <Th>Available Hours</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.entries(tutor.availabilityHours).map(([day, hours]) => (
                        <Tr key={day}>
                          <Td>{day}</Td>
                          <Td>
                            <HStack spacing={2} wrap="wrap">
                              {hours.map((hour, index) => (
                                <Badge key={index} colorScheme="blue">
                                  {hour}
                                </Badge>
                              ))}
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Student Reviews</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    {tutor.reviews.map((review) => (
                      <Box key={review.id}>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">{review.studentName}</Text>
                            <HStack>
                              {renderStars(review.rating)}
                              <Text color="gray.500">{review.date}</Text>
                            </HStack>
                          </VStack>
                        </HStack>
                        <Text mt={2}>{review.comment}</Text>
                        <Divider mt={4} />
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Session Types Tab */}
            <TabPanel>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                {sessionTypes.map((session) => (
                  <Card key={session.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <CardHeader>
                      <Heading size="md">{session.name}</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Text fontSize="2xl" fontWeight="bold">
                          ${session.price}
                        </Text>
                        <Text>{session.duration}</Text>
                        <Text color="gray.500">{session.description}</Text>
                        <Button
                          colorScheme="blue"
                          onClick={handleBookSession}
                        >
                          Book Now
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default TutorProfile; 