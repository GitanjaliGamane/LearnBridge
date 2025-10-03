import {
  Box,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useColorModeValue,
  Avatar,
  Icon,
  useToast,
  Textarea,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCamera, FaSave, FaGraduationCap, FaStar, FaBook, FaCheckCircle } from 'react-icons/fa';

const EditProfile = ({ onClose }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  // Demo data for student
  const [profile, setProfile] = useState({
    name: 'Krishna',
    email: 'krishna@example.com',
    phone: '+91 98765 43210',
    grade: '10',
    school: 'Delhi Public School',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    bio: 'Grade 10 student passionate about learning and academic excellence.',
    location: 'Mumbai, India',
    preferredMode: 'both',
    profileImage: '',
    stats: {
      upcomingSessions: 3,
      favoriteTutors: 2,
      coursesEnrolled: 4,
      completedSessions: 12
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = () => {
    toast({
      title: 'Profile Picture',
      description: 'Image upload functionality will be implemented in the next version.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        {/* Profile Picture */}
        <Box textAlign="center">
          <Box position="relative" display="inline-block">
            <Avatar
              size="2xl"
              name={profile.name}
              src={profile.profileImage}
              mb={4}
              bg="gray.400"
            />
            <Button
              position="absolute"
              bottom="0"
              right="0"
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              onClick={handleImageUpload}
            >
              <Icon as={FaCamera} />
            </Button>
          </Box>
        </Box>

        {/* Statistics */}
        <Box p={4} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <SimpleGrid columns={4} spacing={4}>
            <Stat>
              <StatLabel>Upcoming Sessions</StatLabel>
              <HStack>
                <Icon as={FaBook} color="blue.500" />
                <StatNumber>{profile.stats.upcomingSessions}</StatNumber>
              </HStack>
            </Stat>
            <Stat>
              <StatLabel>Favorite Tutors</StatLabel>
              <HStack>
                <Icon as={FaStar} color="purple.500" />
                <StatNumber>{profile.stats.favoriteTutors}</StatNumber>
              </HStack>
            </Stat>
            <Stat>
              <StatLabel>Courses Enrolled</StatLabel>
              <HStack>
                <Icon as={FaGraduationCap} color="green.500" />
                <StatNumber>{profile.stats.coursesEnrolled}</StatNumber>
              </HStack>
            </Stat>
            <Stat>
              <StatLabel>Completed Sessions</StatLabel>
              <HStack>
                <Icon as={FaCheckCircle} color="orange.500" />
                <StatNumber>{profile.stats.completedSessions}</StatNumber>
              </HStack>
            </Stat>
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Personal Information */}
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Grade/Class</FormLabel>
            <Select
              name="grade"
              value={profile.grade}
              onChange={handleInputChange}
            >
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>School/College</FormLabel>
            <Input
              name="school"
              value={profile.school}
              onChange={handleInputChange}
              placeholder="Enter your school name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              placeholder="Enter your city"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Preferred Mode of Learning</FormLabel>
            <Select
              name="preferredMode"
              value={profile.preferredMode}
              onChange={handleInputChange}
            >
              <option value="online">Online Only</option>
              <option value="offline">Offline Only</option>
              <option value="both">Both Online and Offline</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </FormControl>
        </VStack>

        {/* Save Button */}
        <Button
          colorScheme="blue"
          leftIcon={<FaSave />}
          onClick={handleSave}
          size="lg"
          w="100%"
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default EditProfile; 