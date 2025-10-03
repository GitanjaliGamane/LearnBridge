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
  Textarea,
  Avatar,
  useToast,
  Grid,
  GridItem,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    photo: user?.photo || '',
    bio: user?.bio || '',
    subjects: user?.subjects || [],
    experience: user?.experience || '',
    languages: user?.languages || [],
    availability: user?.availability || '',
  });

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value;
    setProfileData((prev) => ({
      ...prev,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Implement file upload to server/storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update profile
      await updateUser(profileData);
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
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
            <Heading size="lg">Profile</Heading>
            <Button
              colorScheme="blue"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </HStack>

          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8}>
            <GridItem>
              <Box
                p={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
              >
                <VStack spacing={6}>
                  <Box position="relative">
                    <Avatar
                      size="2xl"
                      src={profileData.photo}
                      name={profileData.name}
                    />
                    {isEditing && (
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        position="absolute"
                        bottom="0"
                        left="0"
                        opacity="0"
                        cursor="pointer"
                        width="100%"
                        height="100%"
                      />
                    )}
                  </Box>

                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      isReadOnly={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      isReadOnly={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Subjects</FormLabel>
                    {isEditing ? (
                      <Input
                        placeholder="Enter subjects separated by commas"
                        value={profileData.subjects.join(', ')}
                        onChange={(e) => handleArrayInputChange(e, 'subjects')}
                      />
                    ) : (
                      <HStack spacing={2} wrap="wrap">
                        {profileData.subjects.map((subject, index) => (
                          <Tag key={index} size="md" colorScheme="blue">
                            <TagLabel>{subject}</TagLabel>
                          </Tag>
                        ))}
                      </HStack>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Experience</FormLabel>
                    <Input
                      name="experience"
                      value={profileData.experience}
                      onChange={handleInputChange}
                      isReadOnly={!isEditing}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Languages</FormLabel>
                    {isEditing ? (
                      <Input
                        placeholder="Enter languages separated by commas"
                        value={profileData.languages.join(', ')}
                        onChange={(e) => handleArrayInputChange(e, 'languages')}
                      />
                    ) : (
                      <HStack spacing={2} wrap="wrap">
                        {profileData.languages.map((language, index) => (
                          <Tag key={index} size="md" colorScheme="green">
                            <TagLabel>{language}</TagLabel>
                          </Tag>
                        ))}
                      </HStack>
                    )}
                  </FormControl>

                  {isEditing && (
                    <Button colorScheme="blue" onClick={handleSave} width="100%">
                      Save Changes
                    </Button>
                  )}
                </VStack>
              </Box>
            </GridItem>

            <GridItem>
              <Box
                p={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Quick Stats</Heading>
                  <Text>
                    <strong>Total Students:</strong> 0
                  </Text>
                  <Text>
                    <strong>Active Sessions:</strong> 0
                  </Text>
                  <Text>
                    <strong>Rating:</strong> 0.0 ★
                  </Text>
                  <Text>
                    <strong>Hourly Rate:</strong> $0
                  </Text>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Profile; 