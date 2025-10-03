import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const period = i < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${period}`;
});

const Availability = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  
  // Mock availability data
  const mockAvailability = {
    Monday: { enabled: true, slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
    Tuesday: { enabled: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
    Wednesday: { enabled: true, slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
    Thursday: { enabled: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
    Friday: { enabled: true, slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
    Saturday: { enabled: false, slots: [] },
    Sunday: { enabled: false, slots: [] },
  };
  
  const [availability, setAvailability] = useState(
    user?.availability || mockAvailability
  );

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleDayToggle = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const handleTimeSlotToggle = (day, timeSlot) => {
    setAvailability((prev) => {
      const daySlots = prev[day].slots || [];
      const newSlots = daySlots.includes(timeSlot)
        ? daySlots.filter((slot) => slot !== timeSlot)
        : [...daySlots, timeSlot].sort((a, b) => TIME_SLOTS.indexOf(a) - TIME_SLOTS.indexOf(b));

      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: newSlots,
        },
      };
    });
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update availability
      await updateUser({ availability });
      toast({
        title: 'Availability updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating availability',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={20}>
      <Container maxW="1200px">
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Manage Availability</Heading>
            <Button colorScheme="blue" onClick={handleSave}>
              Save Changes
            </Button>
          </HStack>

          <Grid templateColumns="repeat(7, 1fr)" gap={4}>
            {DAYS.map((day) => (
              <GridItem key={day}>
                <Box
                  p={4}
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                >
                  <VStack spacing={4}>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">{day}</FormLabel>
                      <Switch
                        isChecked={availability[day].enabled}
                        onChange={() => handleDayToggle(day)}
                      />
                    </FormControl>

                    {availability[day].enabled && (
                      <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
                        {TIME_SLOTS.map((timeSlot) => (
                          <Button
                            key={timeSlot}
                            size="sm"
                            variant={availability[day].slots.includes(timeSlot) ? 'solid' : 'outline'}
                            colorScheme={availability[day].slots.includes(timeSlot) ? 'blue' : 'gray'}
                            onClick={() => handleTimeSlotToggle(day, timeSlot)}
                          >
                            {timeSlot}
                          </Button>
                        ))}
                      </VStack>
                    )}
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>

          <Box
            p={4}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
          >
            <VStack spacing={4} align="stretch">
              <Heading size="md">Quick Actions</Heading>
              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement Google Calendar sync
                    toast({
                      title: 'Coming soon',
                      description: 'Google Calendar sync will be available in a future update',
                      status: 'info',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Sync with Google Calendar
                </Button>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    setAvailability(
                      DAYS.reduce(
                        (acc, day) => ({
                          ...acc,
                          [day]: { enabled: false, slots: [] },
                        }),
                        {}
                      )
                    );
                  }}
                >
                  Clear All
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Availability; 