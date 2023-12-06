import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { BACKEND_URL } from "../../../lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { bookingsAtom, driversAtom } from "../../../lib/jotai/atoms";
import Booking from "../../../lib/types/booking";
import Driver from "../../../lib/types/Driver";

interface Props {
  bookingToEdit: Booking;
}

export default function EditBookingModal({ bookingToEdit }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookings, setBookings] = useAtom(bookingsAtom);
  const [drivers, setDrivers] = useAtom(driversAtom);
  const [loading, setLoading] = useState(false);

  const [distance, setDistance] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(0);

  const toast = useToast();
  const {
    getValues,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<Booking>({
    defaultValues: bookingToEdit,
  });

  const onSubmit = async () => {
    try {
      //-------------------------[Update Booking]-------------------------------------
      // Update the bookings table
      const selectedDriver = getValues().driver;
      const updatedBooking: Booking = {
        ...getValues(),
        fare: Number(calculateFare(distance, fuelPrice)),
        _id: bookingToEdit._id,
        driver: {
          // Only add the name and license number of the driver
          name: selectedDriver!.name,
          licenseNumber: selectedDriver!.licenseNumber,
        },
      };
      await axios.put(`${BACKEND_URL}/edit-booking`, updatedBooking);

      // Update the routes list table (state)
      const tempBooking: Booking[] = bookings;
      let index = bookings.findIndex(
        (booking) => booking._id === bookingToEdit._id
      );
      tempBooking[index] = updatedBooking;
      setBookings([...tempBooking]);

      //------------------------[Update Driver]---------------------------------------
      // Update the drivers table
      const updatedDriver: Driver = {
        ...selectedDriver!,
        isBooked: true,
      };

      await axios.put(`${BACKEND_URL}/edit-driver`, updatedDriver);

      // Update the drivers list table (state)
      const tempDrivers: Driver[] = drivers;
      index = drivers.findIndex(
        (driver) => driver.licenseNumber === updatedDriver.licenseNumber
      );
      tempDrivers[index] = updatedDriver;
      setDrivers([...tempDrivers]);
      // Update the drivers table

      toast({
        title: "Success!",
        description: "Booking Updated successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Oh No! 😥",
        description: "Something went wrong. Please contact the admin for help.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(e);
    }

    setLoading(false);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Remove Route"
        icon={<MdEdit />}
        size={"sm"}
        rounded={"full"}
        onClick={() => {
          reset(bookingToEdit);
          onOpen();
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack>
              <FormControl>
                <FormLabel>Distance (KM)</FormLabel>
                <Input
                  type="number"
                  placeholder="25000 PKR"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Fuel Price (RPS)</FormLabel>
                <Input
                  type="number"
                  placeholder="25000 PKR"
                  defaultValue={500}
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                />
              </FormControl>
            </HStack>

            <Text
              mt={2}
              border={"1px solid"}
              rounded={"md"}
              padding={2}
              borderColor={"blackAlpha.300"}
            >
              Fare:{" "}
              <Text as={"span"} fontWeight={"bold"} color={"green"}>
                {calculateFare(distance, fuelPrice)}
              </Text>{" "}
              <Text as={"span"} color={"blackAlpha.700"} fontSize={"12px"}>
                PKR{" "}
              </Text>
            </Text>

            <FormControl mt={4}>
              <FormLabel>Driver</FormLabel>
              <Select
                id="driver-select"
                placeholder="Select Driver"
                defaultValue={bookingToEdit.driver?.name}
                onChange={(e) => {
                  // @ts-expect-error ignore this error
                  setValue("driver", drivers[e.target.value]);
                }}
              >
                {drivers.map(
                  (driver, index) =>
                    !driver.isBooked && (
                      <option key={index} value={index}>
                        {driver.name}
                      </option>
                    )
                )}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue={bookingToEdit.status}
                onChange={(e) => {
                  if (e.target.value === "Cancelled") {
                    document
                      .getElementById("driver-select")
                      ?.setAttribute("disabled", "true");
                    setValue("driver.licenseNumber", "");
                  } else {
                    document
                      .getElementById("driver-select")
                      ?.removeAttribute("disabled");
                  }
                  setValue(
                    "status",
                    e.target.value as "Pending" | "Confirmed" | "Cancelled"
                  );
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} isDisabled={loading ? true : false}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              isDisabled={!isValid}
              onClick={() => {
                setLoading(true);
                onSubmit();
              }}
            >
              {loading ? <Spinner /> : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const calculateFare = (distance: number, fuelPrice: number) => {
  const VEHICLE_AVG = 13;
  return ((distance / VEHICLE_AVG) * fuelPrice).toFixed(2);
};
