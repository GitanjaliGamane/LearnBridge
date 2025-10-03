import { Box, Container, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Card, CardBody, VStack, Text } from '@chakra-ui/react';

const Analytics = () => {
  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading size="xl" color="gray.700">
            Analytics Dashboard
          </Heading>
          <Text color="gray.600">
            Overview of platform statistics and performance
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Students</StatLabel>
                  <StatNumber>1,234</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Teachers</StatLabel>
                  <StatNumber>89</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Active Courses</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12.5%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Sessions</StatLabel>
                  <StatNumber>5,678</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    34.12%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Popular Subjects</Heading>
                  <Text>Mathematics: 45%</Text>
                  <Text>Physics: 30%</Text>
                  <Text>Chemistry: 25%</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">User Activity</Heading>
                  <Text>Active Students: 789</Text>
                  <Text>Active Teachers: 67</Text>
                  <Text>Average Session Duration: 45 mins</Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Analytics; 