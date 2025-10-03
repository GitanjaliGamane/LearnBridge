import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Input,
  Button,
  Icon,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Badge,
  Divider,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaPaperclip, FaPaperPlane, FaCheck, FaCheckDouble } from 'react-icons/fa';

const Messages = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  // Demo data for tutors
  const tutors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      subjects: 'Mathematics, Physics',
      lastMessage: 'I'll send you the practice problems shortly.',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      subjects: 'English, History',
      lastMessage: 'Great job on the essay!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: 'Amit Patel',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      subjects: 'Chemistry, Biology',
      lastMessage: 'Let me know if you need help with the lab report.',
      lastMessageTime: '2 days ago',
      unreadCount: 1,
      isOnline: true,
    }
  ];

  // Demo chat messages
  const demoMessages = {
    1: [
      {
        id: 1,
        sender: 'tutor',
        content: 'Hello! How can I help you with mathematics today?',
        timestamp: '10:00 AM',
        status: 'read',
      },
      {
        id: 2,
        sender: 'student',
        content: 'I need help with calculus problems.',
        timestamp: '10:05 AM',
        status: 'read',
      },
      {
        id: 3,
        sender: 'tutor',
        content: 'Sure, I can help you with that. What specific topics are you struggling with?',
        timestamp: '10:10 AM',
        status: 'read',
      },
      {
        id: 4,
        sender: 'student',
        content: 'Integration and differentiation.',
        timestamp: '10:15 AM',
        status: 'read',
      },
      {
        id: 5,
        sender: 'tutor',
        content: 'I'll send you some practice problems shortly.',
        timestamp: '10:30 AM',
        status: 'delivered',
      }
    ],
    2: [
      {
        id: 1,
        sender: 'tutor',
        content: 'I've reviewed your essay. It's well-written!',
        timestamp: 'Yesterday, 3:00 PM',
        status: 'read',
      },
      {
        id: 2,
        sender: 'student',
        content: 'Thank you! Do you have any suggestions for improvement?',
        timestamp: 'Yesterday, 3:05 PM',
        status: 'read',
      },
      {
        id: 3,
        sender: 'tutor',
        content: 'Great job on the essay!',
        timestamp: 'Yesterday, 3:10 PM',
        status: 'read',
      }
    ],
    3: [
      {
        id: 1,
        sender: 'tutor',
        content: 'How's the lab report coming along?',
        timestamp: '2 days ago, 4:00 PM',
        status: 'read',
      },
      {
        id: 2,
        sender: 'student',
        content: 'I'm having trouble with the data analysis section.',
        timestamp: '2 days ago, 4:05 PM',
        status: 'read',
      },
      {
        id: 3,
        sender: 'tutor',
        content: 'Let me know if you need help with the lab report.',
        timestamp: '2 days ago, 4:10 PM',
        status: 'delivered',
      }
    ]
  };

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Load messages when tutor is selected
  useEffect(() => {
    if (selectedTutor) {
      setMessages(demoMessages[selectedTutor.id] || []);
    }
  }, [selectedTutor]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedTutor && isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, selectedTutor]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    
    // Simulate message sending
    setTimeout(() => {
      const newMsg = {
        id: messages.length + 1,
        sender: 'student',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      setMessages([...messages, newMsg]);
      setNewMessage('');
      setIsSending(false);
      
      // Simulate tutor response
      setTimeout(() => {
        const tutorResponse = {
          id: messages.length + 2,
          sender: 'tutor',
          content: 'Thank you for your message. I'll get back to you soon.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        };
        setMessages(prev => [...prev, tutorResponse]);
        setIsTyping(true);
      }, 2000);
    }, 1000);
  };

  const handleFileUpload = () => {
    toast({
      title: 'File Upload',
      description: 'File upload functionality will be implemented in the next version.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        <Heading size="lg" mb={6}>Messages</Heading>
        
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody p={0}>
            <Flex h="600px">
              {/* Tutors List */}
              <Box w="300px" borderRight="1px" borderColor={borderColor}>
                <VStack spacing={0} align="stretch">
                  {tutors.map(tutor => (
                    <Box
                      key={tutor.id}
                      p={4}
                      cursor="pointer"
                      bg={selectedTutor?.id === tutor.id ? 'blue.50' : 'transparent'}
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => setSelectedTutor(tutor)}
                    >
                      <HStack spacing={3}>
                        <Avatar name={tutor.name} src={tutor.image} />
                        <Box flex={1}>
                          <HStack justify="space-between">
                            <Text fontWeight="bold">{tutor.name}</Text>
                            <Text fontSize="sm" color="gray.500">{tutor.lastMessageTime}</Text>
                          </HStack>
                          <HStack>
                            <Text fontSize="sm" color="gray.500" noOfLines={1}>{tutor.lastMessage}</Text>
                            {tutor.unreadCount > 0 && (
                              <Badge colorScheme="blue">{tutor.unreadCount}</Badge>
                            )}
                          </HStack>
                        </Box>
                        {tutor.isOnline && (
                          <Box w={2} h={2} bg="green.500" borderRadius="full" />
                        )}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Chat Area */}
              <Box flex={1} display="flex" flexDirection="column">
                {selectedTutor ? (
                  <>
                    {/* Chat Header */}
                    <Box p={4} borderBottom="1px" borderColor={borderColor}>
                      <HStack>
                        <Avatar name={selectedTutor.name} src={selectedTutor.image} />
                        <Box>
                          <Text fontWeight="bold">{selectedTutor.name}</Text>
                          <Text fontSize="sm" color="gray.500">{selectedTutor.subjects}</Text>
                        </Box>
                      </HStack>
                    </Box>

                    {/* Messages */}
                    <Box flex={1} p={4} overflowY="auto">
                      <VStack spacing={4} align="stretch">
                        {messages.map(message => (
                          <Box
                            key={message.id}
                            alignSelf={message.sender === 'student' ? 'flex-end' : 'flex-start'}
                            maxW="70%"
                          >
                            <Box
                              bg={message.sender === 'student' ? 'blue.500' : 'gray.100'}
                              color={message.sender === 'student' ? 'white' : 'black'}
                              p={3}
                              borderRadius="lg"
                            >
                              <Text>{message.content}</Text>
                              <HStack justify="flex-end" mt={1}>
                                <Text fontSize="xs" color={message.sender === 'student' ? 'blue.100' : 'gray.500'}>
                                  {message.timestamp}
                                </Text>
                                {message.sender === 'student' && (
                                  <Icon
                                    as={message.status === 'read' ? FaCheckDouble : FaCheck}
                                    color={message.status === 'read' ? 'blue.100' : 'gray.300'}
                                    boxSize={3}
                                  />
                                )}
                              </HStack>
                            </Box>
                          </Box>
                        ))}
                        {isTyping && (
                          <Box alignSelf="flex-start">
                            <HStack spacing={2} bg="gray.100" p={2} borderRadius="lg">
                              <Spinner size="sm" />
                              <Text fontSize="sm">Typing...</Text>
                            </HStack>
                          </Box>
                        )}
                      </VStack>
                    </Box>

                    {/* Message Input */}
                    <Box p={4} borderTop="1px" borderColor={borderColor}>
                      <HStack>
                        <Button
                          variant="ghost"
                          onClick={handleFileUpload}
                          isDisabled={isSending}
                        >
                          <Icon as={FaPaperclip} />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          isDisabled={isSending}
                        />
                        <Button
                          colorScheme="blue"
                          onClick={handleSendMessage}
                          isLoading={isSending}
                        >
                          <Icon as={FaPaperPlane} />
                        </Button>
                      </HStack>
                    </Box>
                  </>
                ) : (
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.500"
                  >
                    <Text>Select a tutor to start chatting</Text>
                  </Box>
                )}
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default Messages; 