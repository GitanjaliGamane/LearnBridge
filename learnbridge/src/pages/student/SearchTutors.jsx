import {
  Box,
  Grid,
  Card,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Icon,
  Flex,
  Spacer,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  List,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon, StarIcon, LocationIcon, ClockIcon, HeartIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const SearchTutors = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [tutors, setTutors] = useState([]);
  const [subject, setSubject] = useState('');
  const [availability, setAvailability] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [mode, setMode] = useState('both');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [availabilityDays, setAvailabilityDays] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // TODO: Fetch actual data from API
    setTutors([
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: null,
        subjects: ['Mathematics', 'Physics'],
        location: 'New York, USA',
        availability: 'Weekdays, 9 AM - 5 PM',
        price: 50,
        rating: 4.9,
        totalStudents: 150,
        mode: 'online',
        education: 'Ph.D. in Mathematics',
        experience: '5 years',
        languages: ['English', 'Spanish'],
        bio: 'Experienced mathematics tutor specializing in calculus and algebra.',
      },
      {
        id: 2,
        name: 'Michael Brown',
        avatar: null,
        subjects: ['Physics', 'Chemistry'],
        location: 'London, UK',
        availability: 'Weekends, 10 AM - 6 PM',
        price: 45,
        rating: 4.8,
        totalStudents: 120,
        mode: 'offline',
        education: 'M.Sc. in Physics',
        experience: '3 years',
        languages: ['English'],
        bio: 'Physics tutor with a passion for making complex concepts simple.',
      },
    ]);
  }, []);

  const handleSearch = () => {
    let filteredTutors = tutors.filter(tutor => {
      const subjectMatch = subject ? tutor.subjects.toLowerCase().includes(subject.toLowerCase()) : true;
      const ratingMatch = tutor.rating >= minRating;
      const modeMatch = mode === 'both' ? true : tutor.mode === mode;
      const searchMatch = searchQuery ? 
        (tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         tutor.subjects.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tutor.bio.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      
      const availabilityMatch = availabilityDays.length > 0 ? 
        availabilityDays.some(day => tutor.availabilityDays.includes(day)) : true;
      
      return subjectMatch && ratingMatch && modeMatch && searchMatch && availabilityMatch;
    });
    
    filteredTutors = sortTutors(filteredTutors, sortBy);
    
    setSearchResults(filteredTutors);
  };

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

  const viewTutorProfile = (tutor) => {
    setSelectedTutor(tutor);
    onOpen();
  };

  return (
    <Box>
      {/* Search and Filters */}
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search tutors by name or subject"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

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
                <Text mb={2} fontWeight="medium">Availability</Text>
                <Input 
                  type="datetime-local" 
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                />
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

      {/* Tutor List */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {searchResults.map((tutor) => (
          <Card key={tutor.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <HStack>
                  <Avatar size="lg" name={tutor.name} src={tutor.avatar} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{tutor.name}</Text>
                    <Text color="gray.500">{tutor.subjects.join(', ')}</Text>
                  </VStack>
                  <Spacer />
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    size="sm"
                    onClick={() => onAction('favorite', tutor.id)}
                  >
                    <HeartIcon />
                  </Button>
                </HStack>

                <HStack>
                  <Icon as={LocationIcon} color="gray.500" />
                  <Text fontSize="sm">{tutor.location}</Text>
                </HStack>

                <HStack>
                  <Icon as={ClockIcon} color="gray.500" />
                  <Text fontSize="sm">{tutor.availability}</Text>
                </HStack>

                <HStack>
                  <Icon as={StarIcon} color="yellow.500" />
                  <Text fontSize="sm">
                    {tutor.rating} ({tutor.totalStudents} students)
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">${tutor.price}/hour</Text>
                  <Badge colorScheme={tutor.mode === 'online' ? 'green' : 'blue'}>
                    {tutor.mode}
                  </Badge>
                </HStack>

                <Button colorScheme="blue" onClick={() => viewTutorProfile(tutor)}>
                  View Profile
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Tutor Profile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Avatar size="lg" name={selectedTutor?.name} src={selectedTutor?.avatar} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{selectedTutor?.name}</Text>
                <Text color="gray.500">{selectedTutor?.subjects.join(', ')}</Text>
              </VStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold">Education</Text>
                <Text>{selectedTutor?.education}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Experience</Text>
                <Text>{selectedTutor?.experience} years of teaching</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Languages</Text>
                <Text>{selectedTutor?.languages.join(', ')}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">About</Text>
                <Text>{selectedTutor?.bio}</Text>
              </Box>

              <Divider />

              <HStack justify="space-between">
                <Text fontWeight="bold">Rate</Text>
                <Text>${selectedTutor?.price}/hour</Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontWeight="bold">Mode</Text>
                <Badge colorScheme={selectedTutor?.mode === 'online' ? 'green' : 'blue'}>
                  {selectedTutor?.mode}
                </Badge>
              </HStack>

              <Button colorScheme="blue" size="lg" onClick={() => onAction('book', selectedTutor?.id)}>
                Book a Session
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchTutors; 