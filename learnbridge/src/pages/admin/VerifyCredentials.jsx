import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
  Flex,
  Spacer,
  Text,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon, ViewIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const VerifyCredentials = ({ onAction }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock data - replace with actual API calls
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });

  useEffect(() => {
    // TODO: Fetch actual data from API
    setDocuments([
      {
        id: 1,
        tutorId: 1,
        tutorName: 'John Doe',
        title: 'Teaching Certificate',
        issuer: 'State Education Board',
        issueDate: '2023-01-15',
        status: 'pending',
        fileUrl: 'https://example.com/certificate.pdf',
        fileType: 'pdf',
      },
      {
        id: 2,
        tutorId: 2,
        tutorName: 'Jane Smith',
        title: 'PhD in Mathematics',
        issuer: 'University of Science',
        issueDate: '2022-06-20',
        status: 'approved',
        fileUrl: 'https://example.com/phd.pdf',
        fileType: 'pdf',
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.tutorName.toLowerCase().includes(filters.search.toLowerCase()) ||
      doc.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || doc.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <InputGroup maxW={{ base: '100%', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search documents..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="Filter by status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
          </Flex>
        </CardBody>
      </Card>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tutor</Th>
              <Th>Document</Th>
              <Th>Issuer</Th>
              <Th>Issue Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDocuments.map((doc) => (
              <Tr key={doc.id}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={doc.tutorName} />
                    <Text>{doc.tutorName}</Text>
                  </HStack>
                </Td>
                <Td>{doc.title}</Td>
                <Td>{doc.issuer}</Td>
                <Td>{new Date(doc.issueDate).toLocaleDateString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      leftIcon={<ViewIcon />}
                      onClick={() => handleViewDocument(doc)}
                    >
                      View
                    </Button>
                    {doc.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          colorScheme="green"
                          leftIcon={<CheckIcon />}
                          onClick={() => onAction('approve', doc)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<CloseIcon />}
                          onClick={() => onAction('reject', doc)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDocument && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold">Tutor:</Text>
                  <Text>{selectedDocument.tutorName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Document:</Text>
                  <Text>{selectedDocument.title}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Issuer:</Text>
                  <Text>{selectedDocument.issuer}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Issue Date:</Text>
                  <Text>{new Date(selectedDocument.issueDate).toLocaleDateString()}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status:</Text>
                  <Badge colorScheme={getStatusColor(selectedDocument.status)}>
                    {selectedDocument.status}
                  </Badge>
                </Box>
                <Box>
                  <Text fontWeight="bold">Document Preview:</Text>
                  {selectedDocument.fileType === 'pdf' ? (
                    <iframe
                      src={selectedDocument.fileUrl}
                      width="100%"
                      height="500px"
                      title="Document Preview"
                    />
                  ) : (
                    <Image src={selectedDocument.fileUrl} alt="Document Preview" />
                  )}
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VerifyCredentials; 