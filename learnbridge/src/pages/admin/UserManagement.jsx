import { Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack, HStack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'student', status: 'inactive' },
  ]);
  const toast = useToast();

  const handleStatusChange = (userId, newStatus) => {
    toast({
      title: 'Status Updated',
      description: `User status changed to ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt={20} px={{ base: 4, md: 8 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading size="xl" color="gray.700">
            User Management
          </Heading>
          <Text color="gray.600">
            Manage all users in the system
          </Text>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>{user.status}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          colorScheme={user.status === 'active' ? 'red' : 'green'}
                          onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button size="sm" colorScheme="blue">
                          Edit
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserManagement; 