// Import statements remain unchanged
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Select,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../lib/constants";
import { SlRefresh } from "react-icons/sl";
import Booking from "../../../lib/types/booking";
import { useForm } from "react-hook-form";
import User from "../../../lib/types/user";
import Route from "../../../lib/types/Route";
import Footer from "../../Footer";
import PaymentModal from "../../modals/payment/PaymentModal";

const HomePage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [booking, setBooking] = useState<Booking>({} as Booking);
  const [isPredefinedRoute, setUseSelectedRoute] = useState<boolean>(false);
  const [predefinedRouteIndex, setPredifinedRouteIndex] = useState<number>(0);
  const [user, setuser] = useState<User>(
    JSON.parse(sessionStorage.getItem("user")!)
  );
  const navigate = useNavigate();

  const {
    register,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<Booking>({
    defaultValues: booking,
  });

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }

    const getRoutes = async () => {
      try {
        const response = await axios.get<RouteOption[]>(
          `${BACKEND_URL}/get-routes`
        );
        if (response.data) {
          setRoutes(response.data);
        } else {
          setRoutes([]);
        }
      } catch (e) {
        console.error("Error fetching routes:", e);
        alert("Error: Failed to fetch routes.");
      }
    };

    getUserBooking();
    reset(booking);
    getRoutes();
  }, []);

  const onSubmit = async () => {
    const finalBooking: Booking = getValues();
    finalBooking.customerEmail = user.email;

    if (isPredefinedRoute) {
      // Add relevant route into booking object
      const chosenRoute = routes[predefinedRouteIndex];

      finalBooking.origin = chosenRoute.origin;
      finalBooking.destination = chosenRoute.destination;
      finalBooking.routeCode = chosenRoute.code;
      finalBooking.fare = chosenRoute.fare;

      try {
        await axios.post(`${BACKEND_URL}/addbookings`, finalBooking);
      } catch (e) {
        console.error("Error adding booking:", e);
        alert("Error: Failed to add booking.");
      }
    } else {
      try {
        await axios.post(`${BACKEND_URL}/addbookings`, finalBooking);
        alert("Booking Successful: Your booking has been submitted.");
      } catch (e) {
        console.error(e);
        alert("Error: Failed to add booking.");
      }
    }
  };

  // Fetch user's booking
  const getUserBooking = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get-booking/${user.email}`);
      setBooking(res.data);
      reset(booking);
      console.log(booking);
    } catch (e) {
      console.error("Error fetching routes:", e);
      alert("Error: Failed to fetch your bookings.");
    }
  };

  if (user == null) return <div>Loading...</div>;

  return (
    <Box>
      <Flex justifyContent="space-between" p={4} bg="blue.500" color="white">
        <Heading size="md">Uzair Transport and Tourism</Heading>
        <Link to="/login">
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => sessionStorage.clear()}
          >
            Logout
          </Button>
        </Link>
      </Flex>

      <Box p={4} textAlign="center">
        <Heading>Welcome to Uzair Transport Booking</Heading>
        <Text mt={2}>Your trusted partner for comfortable journeys.</Text>
      </Box>

      <Box p={4} maxW="md" mx="auto">
        <form onSubmit={onSubmit}>
          <FormControl isRequired isReadOnly={booking == null ? false : true}>
            <FormLabel htmlFor="useSelectedRoute">
              Select Predefined Route{" "}
              <input
                type="checkbox"
                id="useSelectedRoute"
                checked={isPredefinedRoute}
                onChange={() => setUseSelectedRoute(!isPredefinedRoute)}
              />
            </FormLabel>

            {isPredefinedRoute ? (
              <Select
                id="routeCode"
                onChange={(e) =>
                  setPredifinedRouteIndex(Number(e.target.value))
                }
              >
                <option value="">Select a Route</option>
                {routes.map((route, index) => (
                  <option key={index} value={index}>
                    {`${route.origin} to ${route.destination}`}
                  </option>
                ))}
              </Select>
            ) : (
              <>
                <FormControl isReadOnly={booking == null ? false : true}>
                  <FormLabel>Pickup Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="Islamabad"
                    {...register("origin")}
                  />
                </FormControl>

                <FormControl isReadOnly={booking == null ? false : true}>
                  <FormLabel>Destination</FormLabel>
                  <Input
                    type="text"
                    placeholder="Karachi"
                    {...register("destination")}
                  />
                </FormControl>
              </>
            )}

            <FormControl isReadOnly={booking == null ? false : true}>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input id="date" type="date" {...register("date")} />
            </FormControl>

            <FormControl isReadOnly={booking == null ? false : true}>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Input id="time" type="time" {...register("time")} />
            </FormControl>

            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              isDisabled={!isValid || booking != null ? true : false}
            >
              Book Now
            </Button>
          </FormControl>
        </form>
      </Box>

      <HStack spacing={10} justify={"center"} align={"center"}>
        <IconButton
          aria-label="Refresh"
          icon={<SlRefresh />}
          rounded="full"
          onClick={getUserBooking}
        ></IconButton>

        <Box>
          <Text fontWeight={"bold"}>Booking Status</Text>
          <Text>{booking?.status}</Text>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Fare </Text>
          <Text>{!booking?.fare ? "-" : booking.fare} </Text>
        </Box>

        <Box>
          <PaymentModal booking={booking} />
        </Box>
      </HStack>

      {/* Page Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
