import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const Credentials = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock credentials data
  const mockCredentials = [
    {
      id: 1,
      title: 'Teaching Certificate',
      issuedBy: 'Ministry of Education',
      year: 2018,
      status: 'verified',
      uploadDate: '2023-01-15T10:30:00Z',
    },
    {
      id: 2,
      title: 'Advanced Mathematics Certification',
      issuedBy: 'National Teachers Association',
      year: 2020,
      status: 'verified',
      uploadDate: '2023-02-20T14:45:00Z',
    },
    {
      id: 3,
      title: 'Physics Teaching License',
      issuedBy: 'State Board of Education',
      year: 2021,
      status: 'pending',
      uploadDate: '2023-03-10T09:15:00Z',
    },
    {
      id: 4,
      title: 'Online Teaching Certification',
      issuedBy: 'International Education Institute',
      year: 2022,
      status: 'rejected',
      uploadDate: '2023-04-05T16:20:00Z',
      rejectionReason: 'Document is unclear. Please upload a higher resolution version.',
    },
  ];
  
  const [credentials, setCredentials] = useState(user?.credentials || mockCredentials);
  const [newCredential, setNewCredential] = useState({
    title: '',
    issuedBy: '',
    year: new Date().getFullYear(),
    file: null,
  });

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCredential((prev) => ({
        ...prev,
        file,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement file upload to server/storage
      const formData = new FormData();
      formData.append('file', newCredential.file);
      formData.append('title', newCredential.title);
      formData.append('issuedBy', newCredential.issuedBy);
      formData.append('year', newCredential.year);

      // Simulate API call
      const response = {
        id: Date.now(),
        ...newCredential,
        status: 'pending',
        uploadDate: new Date().toISOString(),
      };

      setCredentials((prev) => [...prev, response]);
      setNewCredential({
        title: '',
        issuedBy: '',
        year: new Date().getFullYear(),
        file: null,
      });
      onClose();

      toast({
        title: 'Credential uploaded',
        description: 'Your credential has been submitted for verification',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error uploading credential',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Credentials</Heading>
            <Button colorScheme="blue" onClick={onOpen}>
              Upload New Credential
            </Button>
          </HStack>

          <Box
            p={6}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Document Title</Th>
                  <Th>Issued By</Th>
                  <Th>Year</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {credentials.map((credential) => (
                  <Tr key={credential.id}>
                    <Td>{credential.title}</Td>
                    <Td>{credential.issuedBy}</Td>
                    <Td>{credential.year}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(credential.status)}>
                        {credential.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button size="sm" colorScheme="blue" variant="outline">
                          View
                        </Button>
                        {credential.status === 'rejected' && (
                          <Button size="sm" colorScheme="red" variant="outline">
                            Re-upload
                          </Button>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload New Credential</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Document Title</FormLabel>
                <Input
                  name="title"
                  value={newCredential.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Teaching Certificate"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Issued By</FormLabel>
                <Input
                  name="issuedBy"
                  value={newCredential.issuedBy}
                  onChange={handleInputChange}
                  placeholder="e.g., Ministry of Education"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Year of Issue</FormLabel>
                <Input
                  name="year"
                  type="number"
                  value={newCredential.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Document File</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </FormControl>

              <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
                Upload
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Credentials; 