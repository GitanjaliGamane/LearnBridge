import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Link,
  useToast,
  useColorModeValue,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subjects: [],
    experience: '',
    qualifications: '',
    bio: '',
  });
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      // Prepare user data for registration
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'teacher',
        subjects: formData.subjects ? [formData.subjects] : [],
        experience: formData.experience,
        qualifications: formData.qualifications,
        bio: formData.bio
      };
      
      // Call the register function from AuthContext
      await register(userData);
      
      toast({
        title: 'Account Created',
        description: 'Welcome to LearnBridge!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Navigate to teacher dashboard after successful registration
      navigate('/teacher-dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred during registration',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="md">
        <Box
          bg={cardBg}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack spacing={6}>
            <Heading size={{ base: 'lg', md: 'xl' }} color="gray.700">
              Teacher Sign Up
            </Heading>
            <Text color="gray.600" textAlign="center">
              Join our community of expert tutors and help students achieve their academic goals.
            </Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Subjects</FormLabel>
                  <Select
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    placeholder="Select subjects you teach"
                  >
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="computer">Computer Science</option>
                    <option value="languages">Foreign Languages</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Years of Experience</FormLabel>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Select your experience"
                  >
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Qualifications</FormLabel>
                  <Input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Enter your qualifications"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself and your teaching approach"
                    rows={4}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  size="lg"
                >
                  Sign Up
                </Button>
              </VStack>
            </form>

            <Text color="gray.600" fontSize="sm">
              Already have an account?{' '}
              <Link
                as={RouterLink}
                to="/teacher-login"
                color="blue.500"
              >
                Login
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherSignup; 