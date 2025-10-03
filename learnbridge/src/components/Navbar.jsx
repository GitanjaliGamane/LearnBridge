import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaUser, FaBook, FaCalendarAlt, FaCog } from 'react-icons/fa';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout, isStudent } = useAuth();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
          alignItems="center">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
              LearnBridge
            </Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              <Link as={RouterLink} to="/" p={2}>
                Home
              </Link>
              {user && isStudent() && (
                <Link as={RouterLink} to="/student-dashboard" p={2}>
                  Dashboard
                </Link>
              )}
              {user && isStudent() && (
                <Link as={RouterLink} to="/student-dashboard#search-tutors" p={2}>
                  Find Tutors
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {user ? (
            <HStack spacing={4}>
              {isStudent() ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="ghost"
                  >
                    <HStack>
                      <Icon as={FaUser} />
                      <Text>{user.name}</Text>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={RouterLink} to="/student-dashboard" icon={<FaUser />}>
                      Dashboard
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/student-dashboard#search-tutors" icon={<FaSearch />}>
                      Find Tutors
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/student-dashboard#upcoming-sessions" icon={<FaCalendarAlt />}>
                      My Sessions
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/student-dashboard#my-courses" icon={<FaBook />}>
                      My Courses
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem as={RouterLink} to="/edit-profile" icon={<FaCog />}>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Text>Welcome, {user.name}</Text>
                  <Button
                    as={RouterLink}
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'link'}
                    onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </HStack>
          ) : (
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                to="/student-login">
                Student Login
              </Button>
              <Button
                as={RouterLink}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                to="/teacher-login">
                Teacher Login
              </Button>
              <Button
                as={RouterLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                to="/student-signup"
                _hover={{
                  bg: 'blue.300',
                }}>
                Sign Up
              </Button>
            </HStack>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}>
          <Stack spacing={4}>
            <Link as={RouterLink} to="/" py={2}>
              Home
            </Link>
            {user && isStudent() && (
              <Link as={RouterLink} to="/student-dashboard" py={2}>
                Dashboard
              </Link>
            )}
            {user && isStudent() && (
              <Link as={RouterLink} to="/student-dashboard#search-tutors" py={2}>
                Find Tutors
              </Link>
            )}
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
} 