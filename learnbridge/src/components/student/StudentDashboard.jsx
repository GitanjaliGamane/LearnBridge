import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { FaBook, FaUser, FaCalendar, FaHistory, FaCog, FaBell, FaMessage, FaEdit } from 'react-icons/fa';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDisclosure } from '@chakra-ui/react';
import EditProfile from '../../pages/student/EditProfile';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const menuItems = [
    {
      name: 'Find Tutors',
      icon: FaUser,
      path: '/find-tutors',
    },
    {
      name: 'My Sessions',
      icon: FaCalendar,
      path: '/my-sessions',
    },
    {
      name: 'Messages',
      icon: FaMessage,
      path: '/messages',
    },
    {
      name: 'History',
      icon: FaHistory,
      path: '/history',
    },
    {
      name: 'Settings',
      icon: FaCog,
      path: '/settings',
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Header */}
      <Box bg={cardBg} borderBottom="1px" borderColor={borderColor} position="fixed" w="100%" zIndex={1}>
        <Container maxW="1200px">
          <Flex h="16" alignItems="center" justifyContent="space-between">
            <HStack spacing={4}>
              <Avatar name={user?.name} src={user?.profileImage} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{user?.name}</Text>
                <Text fontSize="sm" color="gray.500">Student</Text>
              </VStack>
            </HStack>

            <HStack spacing={4}>
              <Button
                leftIcon={<FaEdit />}
                colorScheme="blue"
                variant="outline"
                onClick={onOpen}
              >
                Edit Profile
              </Button>
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <Icon as={FaBell} />
                </MenuButton>
                <MenuList>
                  <MenuItem>No new notifications</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <Icon as={FaCog} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box pt={20}>
        <Container maxW="1200px">
          <Flex>
            {/* Sidebar */}
            <Box w="250px" position="fixed">
              <VStack spacing={2} align="stretch">
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    as={RouterLink}
                    to={item.path}
                    leftIcon={<Icon as={item.icon} />}
                    variant="ghost"
                    justifyContent="flex-start"
                    w="100%"
                  >
                    {item.name}
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Content Area */}
            <Box ml="250px" flex={1}>
              <Outlet />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Edit Profile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Profile</DrawerHeader>
          <DrawerBody>
            <EditProfile onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default StudentDashboard; 