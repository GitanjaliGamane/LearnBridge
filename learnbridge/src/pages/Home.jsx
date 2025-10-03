import { Box, Container, Flex, Heading, Text, Button, VStack, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="1200px">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={8}
          align="center"
          mb={10}
        >
          <Box flex={1}>
            <Heading 
              size={{ base: 'lg', md: 'xl' }} 
              mb={4} 
              color="gray.700"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Welcome to LearnBridge
            </Heading>
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              color="gray.600" 
              mb={4}
              textAlign={{ base: 'center', md: 'left' }}
            >
              In today's fast-paced world, students often struggle to find the right tutors for academic support, skill development, or exam preparation. Limited access to qualified teachers, busy schedules, and the challenge of attending in-person sessions can make learning difficult.
            </Text>
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              color="gray.600"
              textAlign={{ base: 'center', md: 'left' }}
            >
              LearnBridge is a community-driven platform designed to bridge this gap by connecting passionate educators—including home tutors, special educators, and skilled hobbyists—with students who need additional training beyond their formal education.
            </Text>
          </Box>
          <Box
            flex={1}
            bg={cardBg}
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            boxShadow="md"
            w="100%"
          >
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              textAlign="center" 
              mb={4} 
              color="gray.700"
            >
              Welcome to LearnBridge
            </Heading>
            <Text 
              textAlign="center" 
              mb={6} 
              color="gray.600"
              fontSize={{ base: 'md', md: 'lg' }}
            >
              Please select your login type
            </Text>
            <VStack spacing={4}>
              <Button
                as={RouterLink}
                to="/student-login"
                colorScheme="blue"
                size={{ base: 'md', md: 'lg' }}
                width="100%"
              >
                Student Login
              </Button>
              <Button
                as={RouterLink}
                to="/teacher-login"
                colorScheme="blue"
                size={{ base: 'md', md: 'lg' }}
                width="100%"
              >
                Teacher Login
              </Button>
            </VStack>
          </Box>
        </Flex>

        <Box bg={bgColor} p={{ base: 6, md: 8 }} borderRadius="lg" boxShadow="md" mb={10}>
          <Heading 
            size={{ base: 'md', md: 'lg' }} 
            textAlign="center" 
            mb={8}
          >
            How It Works
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={6}
          >
            {[
              {
                title: 'Step 1: Sign Up & Profile Creation',
                description: 'Students & Tutors register on the platform by providing basic details. Tutors pay a one-time registration fee to activate their profile.',
              },
              {
                title: 'Step 2: Search & Smart Matching',
                description: 'Students search for tutors based on subjects, availability, and learning needs. The system suggests top 4-5 tutors who best match their requirements.',
              },
              {
                title: 'Step 3: Tutor Selection & Payment',
                description: "Students review tutor profiles, check ratings, and make a selection. To connect, they pay a small service charge (a percentage of one month's tuition fee).",
              },
              {
                title: 'Step 4: Connect & Start Learning',
                description: "Once payment is made, students and tutors receive each other's contact details. They schedule sessions and begin learning.",
              },
              {
                title: 'Step 5: Feedback & Continuous Learning',
                description: 'Students can rate and review tutors after sessions. They can continue learning with the same tutor or explore new ones for different subjects.',
              },
            ].map((step, index) => (
              <Box
                key={index}
                p={6}
                borderLeft="4px solid"
                borderColor="blue.500"
                bg={cardBg}
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="md" mb={2} color="gray.700">
                  {step.title}
                </Heading>
                <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                  {step.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 