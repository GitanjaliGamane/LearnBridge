import {
  Box,
  Container,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  Spacer,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SearchIcon, DownloadIcon, CheckIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import DashboardOverview from './admin/DashboardOverview';
import ManageTutors from './admin/ManageTutors';
import ManageStudents from './admin/ManageStudents';
import VerifyCredentials from './admin/VerifyCredentials';
import ManageCourses from './admin/ManageCourses';
import BookingManagement from './admin/BookingManagement';
import EarningsPayouts from './admin/EarningsPayouts';
import ReportsAnalytics from './admin/ReportsAnalytics';
import UserFeedback from './admin/UserFeedback';

const AdminDashboard = () => {
  const { user } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  const handleAction = (action, item) => {
    setSelectedAction(action);
    setSelectedItem(item);
    onOpen();
  };

  const handleConfirmAction = async () => {
    try {
      // TODO: Implement API call based on selectedAction
      toast({
        title: 'Action completed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error performing action',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Admin Dashboard</Heading>
            <Text>Welcome, {user?.name}</Text>
          </HStack>

          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Manage Tutors</Tab>
              <Tab>Manage Students</Tab>
              <Tab>Verify Credentials</Tab>
              <Tab>Manage Courses</Tab>
              <Tab>Booking Management</Tab>
              <Tab>Earnings & Payouts</Tab>
              <Tab>Reports & Analytics</Tab>
              <Tab>User Feedback</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DashboardOverview onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <ManageTutors onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <ManageStudents onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <VerifyCredentials onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <ManageCourses onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <BookingManagement onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <EarningsPayouts onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <ReportsAnalytics onAction={handleAction} />
              </TabPanel>
              <TabPanel>
                <UserFeedback onAction={handleAction} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedAction === 'approve' && 'Approve Request'}
            {selectedAction === 'reject' && 'Reject Request'}
            {selectedAction === 'suspend' && 'Suspend Account'}
            {selectedAction === 'reactivate' && 'Reactivate Account'}
            {selectedAction === 'delete' && 'Delete Item'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>
                Are you sure you want to {selectedAction} this item?
              </Text>

              {(selectedAction === 'reject' || selectedAction === 'suspend') && (
                <Textarea
                  placeholder="Add a note (optional)"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              )}

              <Button
                colorScheme={
                  selectedAction === 'approve' || selectedAction === 'reactivate'
                    ? 'green'
                    : 'red'
                }
                onClick={handleConfirmAction}
                width="100%"
              >
                Confirm
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard; 