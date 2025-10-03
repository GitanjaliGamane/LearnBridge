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
  Input,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Checkbox,
  CheckboxGroup,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaSearch, 
  FaHeart, 
  FaRegHeart, 
  FaExchangeAlt, 
  FaTimes,
  FaUser,
  FaSort,
  FaFilter
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const FindTutors = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State for search filters
  const [subject, setSubject] = useState('');
  const [availability, setAvailability] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [mode, setMode] = useState('both');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Mock data for student
  const studentName = user?.name || 'Student';

  // Mock data for tutors with Indian context
  const tutors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      subjects: 'Mathematics, Physics',
      rating: 4.8,
      experience: '5 years',
      location: 'Mumbai, Maharashtra',
      hourlyRate: 800,
      bio: 'Experienced tutor specializing in mathematics and physics. I have a PhD in Physics from IIT Bombay and have been teaching for over 5 years.',
      availability: 'Mon-Fri, 9AM-5PM',
      mode: 'both',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      subjects: 'English, History',
      rating: 4.9,
      experience: '7 years',
      location: 'Delhi, NCR',
      hourlyRate: 750,
      bio: 'Passionate English and History tutor with a Master\'s degree from Delhi University. I love helping students improve their writing and critical thinking skills.',
      availability: 'Mon-Sun, 10AM-8PM',
      mode: 'online',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Amit Patel',
      subjects: 'Chemistry, Biology',
      rating: 4.7,
      experience: '4 years',
      location: 'Bangalore, Karnataka',
      hourlyRate: 700,
      bio: 'Science enthusiast with a background in Biochemistry from IISc Bangalore. I make complex concepts easy to understand through practical examples.',
      availability: 'Tue-Sat, 2PM-10PM',
      mode: 'offline',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Neha Gupta',
      subjects: 'Mathematics, Computer Science',
      rating: 4.9,
      experience: '3 years',
      location: 'Hyderabad, Telangana',
      hourlyRate: 900,
      bio: 'Software engineer turned tutor. I specialize in mathematics and programming, making these subjects accessible and fun.',
      availability: 'Mon-Fri, 6PM-10PM',
      mode: 'online',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      subjects: 'Physics, Mathematics',
      rating: 4.6,
      experience: '6 years',
      location: 'Chennai, Tamil Nadu',
      hourlyRate: 850,
      bio: 'Physics teacher with a passion for making science accessible to everyone. I use real-world examples to explain complex concepts.',
      availability: 'Mon-Sun, 9AM-9PM',
      mode: 'both',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      id: 6,
      name: 'Ananya Reddy',
      subjects: 'Hindi, Sanskrit',
      rating: 4.8,
      experience: '5 years',
      location: 'Hyderabad, Telangana',
      hourlyRate: 650,
      bio: 'Expert in Hindi and Sanskrit with a Master\'s degree from Osmania University. I help students master these languages through interactive methods.',
      availability: 'Mon-Sat, 10AM-7PM',
      mode: 'both',
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      id: 7,
      name: 'Rahul Mehta',
      subjects: 'Accountancy, Business Studies',
      rating: 4.7,
      experience: '4 years',
      location: 'Ahmedabad, Gujarat',
      hourlyRate: 750,
      bio: 'Chartered Accountant with teaching experience. I simplify complex accounting concepts and business studies topics for better understanding.',
      availability: 'Mon-Fri, 4PM-9PM',
      mode: 'online',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      id: 8,
      name: 'Sneha Kapoor',
      subjects: 'Geography, Political Science',
      rating: 4.9,
      experience: '6 years',
      location: 'Kolkata, West Bengal',
      hourlyRate: 700,
      bio: 'Geography and Political Science expert with a PhD from JNU. I make these subjects interesting through real-world examples and current affairs.',
      availability: 'Mon-Sat, 11AM-8PM',
      mode: 'both',
      image: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      id: 9,
      name: 'Arjun Desai',
      subjects: 'Economics, Mathematics',
      rating: 4.8,
      experience: '5 years',
      location: 'Pune, Maharashtra',
      hourlyRate: 800,
      bio: 'Economics graduate from Fergusson College with a passion for teaching. I help students understand economic concepts through practical examples.',
      availability: 'Mon-Fri, 3PM-9PM',
      mode: 'online',
      image: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
    {
      id: 10,
      name: 'Meera Joshi',
      subjects: 'Psychology, Sociology',
      rating: 4.7,
      experience: '4 years',
      location: 'Jaipur, Rajasthan',
      hourlyRate: 700,
      bio: 'Psychology and Sociology expert with a Master\'s degree from University of Rajasthan. I make these subjects engaging through real-life case studies.',
      availability: 'Mon-Sat, 10AM-6PM',
      mode: 'both',
      image: 'https://randomuser.me/api/portraits/women/10.jpg',
    }
  ];

  // Mock subjects for filter
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Computer Science',
    'Geography',
    'Economics',
    'Psychology',
    'Hindi',
    'Sanskrit',
    'Political Science',
    'Accountancy',
    'Business Studies',
    'Sociology',
    'Environmental Science',
    'Physical Education',
    'Fine Arts',
    'Home Science',
    'Information Technology',
    'Artificial Intelligence',
    'Data Science',
    'Statistics',
    'Commerce',
    'Marketing',
    'Finance',
    'Human Resource Management',
    'Operations Management',
    'Strategic Management'
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTutors');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteTutors', JSON.stringify(favorites));
  }, [favorites]);

  // Handle search
  const handleSearch = () => {
    // Filter tutors based on search criteria
    let filteredTutors = tutors.filter(tutor => {
      const subjectMatch = subject ? tutor.subjects.toLowerCase().includes(subject.toLowerCase()) : true;
      const ratingMatch = tutor.rating >= minRating;
      const modeMatch = mode === 'both' ? true : tutor.mode === mode;
      const searchMatch = searchQuery ? 
        (tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         tutor.subjects.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tutor.bio.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      
      return subjectMatch && ratingMatch && modeMatch && searchMatch;
    });
    
    // Sort the filtered tutors
    filteredTutors = sortTutors(filteredTutors, sortBy);
    
    setSearchResults(filteredTutors);
  };

  // Sort tutors based on selected criteria
  const sortTutors = (tutorsToSort, criteria) => {
    const sortedTutors = [...tutorsToSort];
    
    switch (criteria) {
      case 'rating':
        return sortedTutors.sort((a, b) => b.rating - a.rating);
      case 'experience':
        return sortedTutors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
      default:
        return sortedTutors;
    }
  };

  // Toggle favorite
  const toggleFavorite = (tutorId) => {
    if (favorites.includes(tutorId)) {
      setFavorites(favorites.filter(id => id !== tutorId));
    } else {
      setFavorites([...favorites, tutorId]);
    }
  };

  // Toggle compare
  const toggleCompare = (tutorId) => {
    if (compareList.includes(tutorId)) {
      setCompareList(compareList.filter(id => id !== tutorId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, tutorId]);
    }
  };

  // Get tutor by ID
  const getTutorById = (id) => {
    return tutors.find(tutor => tutor.id === id);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    if (searchResults.length > 0) {
      setSearchResults(sortTutors(searchResults, e.target.value));
    }
  };

  // Get favorite tutors
  const getFavoriteTutors = () => {
    return tutors.filter(tutor => favorites.includes(tutor.id));
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setSearchResults([]);
    }
  };

  // Handle search input key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        {/* Welcome Section */}
        <Box mb={8}>
          <Heading size="lg" mb={2}>
            Find Your Perfect Tutor
          </Heading>
          <Text color="gray.500">Search and explore tutors based on your preferences</Text>
        </Box>

        {/* Tabs for All Tutors and Favorites */}
        <Tabs mb={6}>
          <TabList>
            <Tab>All Tutors</Tab>
            <Tab>Favorites ({favorites.length})</Tab>
          </TabList>

          <TabPanels>
            {/* All Tutors Tab */}
            <TabPanel>
              {/* Search Bar */}
              <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaSearch} color="gray.400" />
                    </InputLeftElement>
                    <Input 
                      placeholder="Search by name, subject, or keywords..." 
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onKeyPress={handleSearchKeyPress}
                    />
                    <Button 
                      ml={2} 
                      colorScheme="blue" 
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </InputGroup>
                </CardBody>
              </Card>

              {/* Search & Explore Tutors Section */}
              <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Search Filters</Heading>
                    <Button 
                      size="sm" 
                      leftIcon={<FaFilter />} 
                      variant="outline"
                      onClick={handleSearch}
                    >
                      Apply Filters
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {/* Search Filters */}
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                      <Box>
                        <Text mb={2} fontWeight="medium">Subject</Text>
                        <Select 
                          placeholder="Select subject" 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          {subjects.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </Select>
                      </Box>
                      <Box>
                        <Text mb={2} fontWeight="medium">Minimum Rating</Text>
                        <Select 
                          value={minRating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                        >
                          <option value={0}>Any</option>
                          <option value={4}>4+ Stars</option>
                          <option value={4.5}>4.5+ Stars</option>
                          <option value={4.8}>4.8+ Stars</option>
                        </Select>
                      </Box>
                      <Box>
                        <Text mb={2} fontWeight="medium">Mode</Text>
                        <Select 
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <option value="both">Both</option>
                          <option value="online">Online Only</option>
                          <option value="offline">Offline Only</option>
                        </Select>
                      </Box>
                      <Box>
                        <Text mb={2} fontWeight="medium">Sort By</Text>
                        <Select 
                          value={sortBy}
                          onChange={handleSortChange}
                        >
                          <option value="rating">Highest Rating</option>
                          <option value="experience">Most Experienced</option>
                        </Select>
                      </Box>
                    </Grid>
                  </VStack>
                </CardBody>
              </Card>

              {/* Search Results */}
              {searchResults.length > 0 ? (
                <Box mb={6}>
                  <Heading size="md" mb={4}>Search Results ({searchResults.length})</Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    {searchResults.map((tutor) => (
                      <Card key={tutor.id} borderWidth="1px" borderColor={borderColor}>
                        <CardHeader>
                          <Flex justify="space-between" align="center">
                            <HStack spacing={4}>
                              <Avatar name={tutor.name} src={tutor.image} />
                              <VStack align="start" spacing={1}>
                                <Heading size="md">{tutor.name}</Heading>
                                <Badge colorScheme="blue">{tutor.rating} ★</Badge>
                              </VStack>
                            </HStack>
                            <HStack>
                              <Tooltip label={favorites.includes(tutor.id) ? "Remove from favorites" : "Add to favorites"}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme={favorites.includes(tutor.id) ? "red" : "gray"}
                                  onClick={() => toggleFavorite(tutor.id)}
                                >
                                  <Icon as={favorites.includes(tutor.id) ? FaHeart : FaRegHeart} />
                                </Button>
                              </Tooltip>
                              <Tooltip label={compareList.includes(tutor.id) ? "Remove from comparison" : "Add to comparison"}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme={compareList.includes(tutor.id) ? "blue" : "gray"}
                                  onClick={() => toggleCompare(tutor.id)}
                                  isDisabled={compareList.length >= 3 && !compareList.includes(tutor.id)}
                                >
                                  <Icon as={FaExchangeAlt} />
                                </Button>
                              </Tooltip>
                            </HStack>
                          </Flex>
                        </CardHeader>
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <Text>
                              <strong>Subjects:</strong> {tutor.subjects}
                            </Text>
                            <Text>
                              <strong>Experience:</strong> {tutor.experience}
                            </Text>
                            <Text>
                              <strong>Location:</strong> {tutor.location}
                            </Text>
                            <Text>
                              <strong>Hourly Rate:</strong> {tutor.hourlyRate}
                            </Text>
                            <Text>
                              <strong>Mode:</strong> {tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}
                            </Text>
                            <Text noOfLines={2}>
                              <strong>Bio:</strong> {tutor.bio}
                            </Text>
                            <HStack width="100%" spacing={2}>
                              <Button
                                colorScheme="blue"
                                flex={1}
                                as={RouterLink}
                                to={`/book-session/${tutor.id}`}
                              >
                                Book Session
                              </Button>
                              <Button
                                colorScheme="teal"
                                flex={1}
                                leftIcon={<FaUser />}
                                as={RouterLink}
                                to={`/tutor-profile/${tutor.id}`}
                              >
                                View Profile
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Box mb={6}>
                  <Heading size="md" mb={4}>Featured Tutors</Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    {tutors.slice(0, 4).map((tutor) => (
                      <Card key={tutor.id} borderWidth="1px" borderColor={borderColor}>
                        <CardHeader>
                          <Flex justify="space-between" align="center">
                            <HStack spacing={4}>
                              <Avatar name={tutor.name} src={tutor.image} />
                              <VStack align="start" spacing={1}>
                                <Heading size="md">{tutor.name}</Heading>
                                <Badge colorScheme="blue">{tutor.rating} ★</Badge>
                              </VStack>
                            </HStack>
                            <HStack>
                              <Tooltip label={favorites.includes(tutor.id) ? "Remove from favorites" : "Add to favorites"}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme={favorites.includes(tutor.id) ? "red" : "gray"}
                                  onClick={() => toggleFavorite(tutor.id)}
                                >
                                  <Icon as={favorites.includes(tutor.id) ? FaHeart : FaRegHeart} />
                                </Button>
                              </Tooltip>
                              <Tooltip label={compareList.includes(tutor.id) ? "Remove from comparison" : "Add to comparison"}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme={compareList.includes(tutor.id) ? "blue" : "gray"}
                                  onClick={() => toggleCompare(tutor.id)}
                                  isDisabled={compareList.length >= 3 && !compareList.includes(tutor.id)}
                                >
                                  <Icon as={FaExchangeAlt} />
                                </Button>
                              </Tooltip>
                            </HStack>
                          </Flex>
                        </CardHeader>
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <Text>
                              <strong>Subjects:</strong> {tutor.subjects}
                            </Text>
                            <Text>
                              <strong>Experience:</strong> {tutor.experience}
                            </Text>
                            <Text>
                              <strong>Location:</strong> {tutor.location}
                            </Text>
                            <Text>
                              <strong>Hourly Rate:</strong> {tutor.hourlyRate}
                            </Text>
                            <Text>
                              <strong>Mode:</strong> {tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}
                            </Text>
                            <Text noOfLines={2}>
                              <strong>Bio:</strong> {tutor.bio}
                            </Text>
                            <HStack width="100%" spacing={2}>
                              <Button
                                colorScheme="blue"
                                flex={1}
                                as={RouterLink}
                                to={`/book-session/${tutor.id}`}
                              >
                                Book Session
                              </Button>
                              <Button
                                colorScheme="teal"
                                flex={1}
                                leftIcon={<FaUser />}
                                as={RouterLink}
                                to={`/tutor-profile/${tutor.id}`}
                              >
                                View Profile
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              )}
            </TabPanel>

            {/* Favorites Tab */}
            <TabPanel>
              {favorites.length > 0 ? (
                <Box mb={6}>
                  <Heading size="md" mb={4}>Your Favorite Tutors</Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    {getFavoriteTutors().map((tutor) => (
                      <Card key={tutor.id} borderWidth="1px" borderColor={borderColor}>
                        <CardHeader>
                          <Flex justify="space-between" align="center">
                            <HStack spacing={4}>
                              <Avatar name={tutor.name} src={tutor.image} />
                              <VStack align="start" spacing={1}>
                                <Heading size="md">{tutor.name}</Heading>
                                <Badge colorScheme="blue">{tutor.rating} ★</Badge>
                              </VStack>
                            </HStack>
                            <HStack>
                              <Tooltip label="Remove from favorites">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme="red"
                                  onClick={() => toggleFavorite(tutor.id)}
                                >
                                  <Icon as={FaHeart} />
                                </Button>
                              </Tooltip>
                              <Tooltip label={compareList.includes(tutor.id) ? "Remove from comparison" : "Add to comparison"}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  colorScheme={compareList.includes(tutor.id) ? "blue" : "gray"}
                                  onClick={() => toggleCompare(tutor.id)}
                                  isDisabled={compareList.length >= 3 && !compareList.includes(tutor.id)}
                                >
                                  <Icon as={FaExchangeAlt} />
                                </Button>
                              </Tooltip>
                            </HStack>
                          </Flex>
                        </CardHeader>
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <Text>
                              <strong>Subjects:</strong> {tutor.subjects}
                            </Text>
                            <Text>
                              <strong>Experience:</strong> {tutor.experience}
                            </Text>
                            <Text>
                              <strong>Location:</strong> {tutor.location}
                            </Text>
                            <Text>
                              <strong>Hourly Rate:</strong> {tutor.hourlyRate}
                            </Text>
                            <Text>
                              <strong>Mode:</strong> {tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}
                            </Text>
                            <Text noOfLines={2}>
                              <strong>Bio:</strong> {tutor.bio}
                            </Text>
                            <HStack width="100%" spacing={2}>
                              <Button
                                colorScheme="blue"
                                flex={1}
                                as={RouterLink}
                                to={`/book-session/${tutor.id}`}
                              >
                                Book Session
                              </Button>
                              <Button
                                colorScheme="teal"
                                flex={1}
                                leftIcon={<FaUser />}
                                as={RouterLink}
                                to={`/tutor-profile/${tutor.id}`}
                              >
                                View Profile
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Card mb={6} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <CardBody>
                    <VStack spacing={4} align="center" py={8}>
                      <Icon as={FaHeart} boxSize={10} color="gray.400" />
                      <Heading size="md">No Favorite Tutors Yet</Heading>
                      <Text color="gray.500" textAlign="center">
                        Add tutors to your favorites by clicking the heart icon on their cards.
                      </Text>
                      <Button
                        colorScheme="blue"
                        onClick={() => document.querySelector('[role="tablist"] button:first-child').click()}
                      >
                        Browse Tutors
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Compare Tutors Button */}
        {compareList.length > 0 && (
          <Button
            mb={6}
            colorScheme="blue"
            leftIcon={<FaExchangeAlt />}
            onClick={onOpen}
          >
            Compare Tutors ({compareList.length})
          </Button>
        )}

        {/* Compare Tutors Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Compare Tutors</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Feature</Th>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return (
                        <Th key={tutorId}>
                          <VStack>
                            <Avatar name={tutor.name} src={tutor.image} size="sm" />
                            <Text>{tutor.name}</Text>
                            <Button 
                              size="xs" 
                              colorScheme="red" 
                              onClick={() => toggleCompare(tutorId)}
                            >
                              <Icon as={FaTimes} />
                            </Button>
                          </VStack>
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Rating</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.rating} ★</Td>;
                    })}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Subjects</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.subjects}</Td>;
                    })}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Experience</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.experience}</Td>;
                    })}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Hourly Rate</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.hourlyRate}</Td>;
                    })}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Mode</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.mode.charAt(0).toUpperCase() + tutor.mode.slice(1)}</Td>;
                    })}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Location</Td>
                    {compareList.map(tutorId => {
                      const tutor = getTutorById(tutorId);
                      return <Td key={tutorId}>{tutor.location}</Td>;
                    })}
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default FindTutors; 