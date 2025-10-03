import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Avatar,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'tutor',
      text: 'Hello! How can I help you today?',
      timestamp: '10:00 AM',
    },
    {
      id: 2,
      sender: 'student',
      text: 'Hi! I need help with my math homework.',
      timestamp: '10:01 AM',
    },
    {
      id: 3,
      sender: 'tutor',
      text: 'Sure, I can help you with that. What specific topic are you working on?',
      timestamp: '10:02 AM',
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'student',
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Box pt={20}>
      <Container maxW="container.md">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg={bgColor}
          borderColor={borderColor}
        >
          {/* Chat Header */}
          <Box
            p={4}
            borderBottomWidth="1px"
            borderColor={borderColor}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack>
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                variant="ghost"
              />
              <Avatar name="Chat Partner" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">Chat Partner</Text>
                <Text fontSize="sm" color="gray.500">
                  Online
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Chat Messages */}
          <Box
            p={4}
            height="60vh"
            overflowY="auto"
            display="flex"
            flexDirection="column"
            gap={4}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                alignSelf={msg.sender === 'student' ? 'flex-end' : 'flex-start'}
                maxW="70%"
              >
                <Box
                  bg={msg.sender === 'student' ? 'blue.500' : 'gray.100'}
                  color={msg.sender === 'student' ? 'white' : 'black'}
                  p={3}
                  borderRadius="lg"
                >
                  <Text>{msg.text}</Text>
                  <Text
                    fontSize="xs"
                    color={msg.sender === 'student' ? 'blue.100' : 'gray.500'}
                    mt={1}
                  >
                    {msg.timestamp}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box
            p={4}
            borderTopWidth="1px"
            borderColor={borderColor}
            as="form"
            onSubmit={handleSendMessage}
          >
            <HStack>
              <IconButton
                icon={<AttachmentIcon />}
                variant="ghost"
                aria-label="Attach file"
              />
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                size="lg"
              />
              <Button type="submit" colorScheme="blue" px={8}>
                Send
              </Button>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatRoom; 