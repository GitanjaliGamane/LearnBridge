import { Box, Container, Heading, Text, VStack, useColorModeValue, SimpleGrid, Input, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';

const Contact = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="1200px">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }} mb={4} color="gray.700">
              Contact Us
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Have questions or feedback? We'd love to hear from you!
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.700">
                Get in Touch
              </Heading>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Your name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Your email" />
                </FormControl>
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input placeholder="Subject" />
                </FormControl>
                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="Your message" rows={6} />
                </FormControl>
                <Button colorScheme="blue" size="lg">
                  Send Message
                </Button>
              </VStack>
            </Box>

            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4} color="gray.700">
                Contact Information
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" color="gray.700">Email</Text>
                  <Text color="gray.600">support@learnbridge.com</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">Phone</Text>
                  <Text color="gray.600">+1 (555) 123-4567</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">Address</Text>
                  <Text color="gray.600">
                    123 Education Street<br />
                    Learning City, LC 12345<br />
                    United States
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">Business Hours</Text>
                  <Text color="gray.600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </Text>
                </Box>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 