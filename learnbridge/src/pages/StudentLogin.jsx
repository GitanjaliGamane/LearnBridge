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
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        ...formData,
        role: 'student'
      };
      
      await login(userData);
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back to LearnBridge!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the page they were trying to access, or to dashboard
      const from = location.state?.from?.pathname || '/student-dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
              Student Login
            </Heading>
            <Text color="gray.600" textAlign="center">
              Welcome back! Please enter your credentials to access your account.
            </Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
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
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  size="lg"
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </VStack>
            </form>

            <VStack spacing={2}>
              <Link
                as={RouterLink}
                to="/forget-password-student"
                color="blue.500"
                fontSize="sm"
              >
                Forgot Password?
              </Link>
              <Text color="gray.600" fontSize="sm">
                Don't have an account?{' '}
                <Link
                  as={RouterLink}
                  to="/student-signup"
                  color="blue.500"
                >
                  Sign Up
                </Link>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default StudentLogin; 