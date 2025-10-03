import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  Textarea,
  Avatar,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Experienced tutor with 5 years of teaching experience.',
    location: 'New York',
    subjects: 'Mathematics, Physics',
    experience: '5 years',
    hourlyRate: '30',
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your profile update logic here
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt={20}>
      <Container maxW="md">
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg={bgColor}
          borderColor={borderColor}
        >
          <Heading size="lg" textAlign="center" mb={6}>
            Edit Profile
          </Heading>
          <VStack spacing={6} align="center" mb={8}>
            <Box position="relative">
              <Avatar size="2xl" name={formData.name} />
              <IconButton
                icon={<EditIcon />}
                position="absolute"
                bottom={0}
                right={0}
                colorScheme="blue"
                isRound
                size="sm"
                aria-label="Edit profile picture"
              />
            </Box>
          </VStack>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subjects</FormLabel>
                <Input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  placeholder="Enter subjects you teach"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Experience</FormLabel>
                <Input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter your experience"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hourly Rate ($)</FormLabel>
                <Input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                size="lg"
                mt={4}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default EditProfile; 