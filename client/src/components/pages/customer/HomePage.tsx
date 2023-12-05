import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link

const HomePage = () => {
  return (
    <Box>
      {/* Header */}
      <Flex justifyContent="space-between" p={4} bg="blue.500" color="white">
        <Heading size="md">Uzair Transport and Tourism</Heading>
        <Link to="/login"> {/* Use Link to wrap Button */}
          <Button colorScheme="teal" variant="outline">
            Logout
          </Button>
        </Link>
      </Flex>

      {/* Welcome Section */}
      <Box p={4} textAlign="center">
        <Heading>Welcome to Uzair Transport Booking</Heading>
        <Text mt={2}>Your trusted partner for comfortable journeys.</Text>
      </Box>

      {/* Booking Interface */}
      <Box p={4} maxW="md" mx="auto">
        <FormControl isRequired>
          <FormLabel htmlFor="pickup">Pickup Location</FormLabel>
          <Input id="pickup" placeholder="Enter pickup location" />

          <FormLabel htmlFor="destination" mt={4}>Destination</FormLabel>
          <Input id="destination" placeholder="Enter destination" />

          <FormLabel htmlFor="date" mt={4}>Date</FormLabel>
          <Input type="date" id="date" />

          <Button mt={4} colorScheme="blue">
            Book Now
          </Button>
        </FormControl>
      </Box>

      {/* Footer */}
      <Box p={4} bg="gray.200" textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Uzair Transport and Tourism</Text>
      </Box>
    </Box>
  );
};

export default HomePage;
