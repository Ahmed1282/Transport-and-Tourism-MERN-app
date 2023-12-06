import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BACKEND_URL } from "../../../lib/constants";
import axios from "axios";
import { useAtom } from "jotai";
import { bookingsAtom, driversAtom } from "../../../lib/jotai/atoms";
import EditBookingModal from "../../modals/booking/EditBookingModal";

export default function AddDriverModal() {
  const [bookings, setBookings] = useAtom(bookingsAtom);
  const setDrivers = useAtom(driversAtom)[1];

  useEffect(() => {
    // Fetching all bookings
    const getBookings = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-bookings`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    // Fetching all drivers
    const getDrivers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-drivers`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getBookings().then((data) => setBookings(data));
    getDrivers().then((data) => setDrivers(data));
  }, []);

  return (
    <VStack mt={24} spacing={5}>
      <Heading>Bookings Management</Heading>
      <TableContainer
        mt={5}
        alignSelf={"left"}
        hidden={bookings.length == 0 || bookings == undefined ? true : false}
        overflowY="auto"
        maxHeight="500px"
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Date</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Route</Th>
              <Th>Fare</Th>
              <Th>Driver</Th>
              <Th>Status</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>

          <Tbody>
            {bookings.map((booking, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{booking.date}</Td>
                <Td>{booking.origin}</Td>
                <Td>{booking.destination}</Td>
                <Td>{booking.routeCode == null ? "-" : booking.routeCode}</Td>
                <Td>
                  {booking.fare == null || booking.fare == 0
                    ? "-"
                    : CustomizedFare(booking?.fare)}
                </Td>
                <Td>
                  {booking.driver == null ? (
                    // <AddDriverModal />
                    "-"
                  ) : (
                    <Text>{booking.driver.name}</Text>
                  )}
                </Td>
                <Td>{CustomizedStatus(booking.status)}</Td>
                <Td>
                  <Center>
                    <EditBookingModal bookingToEdit={booking} />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

function CustomizedStatus(status: string) {
  const textColor = {
    Pending: "orange",
    Confirmed: "green",
    Cancelled: "red",
  };

  return (
    // @ts-expect-error status type is fixed in schema already
    <Text fontSize={"10px"} fontWeight={"bold"} color={textColor[status]}>
      {status.toUpperCase()}
    </Text>
  );
}

function CustomizedFare(fare: number) {
  return (
    <Text fontWeight={"semibold"}>
      {Number(fare).toLocaleString()}{" "}
      <Text as={"span"} fontSize={"10px"} color={"blackAlpha.700"}>
        PKR
      </Text>
    </Text>
  );
}
