import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="1200px">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }} mb={4} color="gray.700">
              About LearnBridge
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              LearnBridge is a revolutionary platform that connects students with expert tutors,
              making quality education accessible to everyone.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.700">
                Our Mission
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                To bridge the gap between students and quality education by providing a platform
                where they can connect with expert tutors who can help them achieve their academic goals.
              </Text>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.700">
                Our Vision
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                To create a world where every student has access to quality education and expert
                guidance, regardless of their location or financial background.
              </Text>
            </Box>
          </SimpleGrid>

          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4} color="gray.700">
              Why Choose LearnBridge?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {[
                {
                  title: 'Expert Tutors',
                  description: 'Our tutors are highly qualified and experienced in their respective fields.',
                },
                {
                  title: 'Flexible Learning',
                  description: 'Learn at your own pace and schedule sessions according to your convenience.',
                },
                {
                  title: 'Affordable Pricing',
                  description: 'Quality education at reasonable prices, making it accessible to everyone.',
                },
                {
                  title: 'Personalized Attention',
                  description: 'One-on-one sessions ensure personalized attention and better learning outcomes.',
                },
                {
                  title: 'Wide Range of Subjects',
                  description: 'From academic subjects to skill development, we cover it all.',
                },
                {
                  title: 'Safe Learning Environment',
                  description: 'A secure platform where students can learn without any worries.',
                },
              ].map((feature, index) => (
                <Box
                  key={index}
                  p={4}
                  borderLeft="4px solid"
                  borderColor="blue.500"
                  bg={cardBg}
                  borderRadius="md"
                >
                  <Heading size="sm" mb={2} color="gray.700">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default About; 