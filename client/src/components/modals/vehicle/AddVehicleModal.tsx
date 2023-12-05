import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Vehicle from "../../../lib/types/vehicle";
import { useAtom } from "jotai";
import { vehiclesAtom } from "../../../lib/jotai/atoms";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../lib/constants";

export default function AddVehicleModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vehicles, setVehicles] = useAtom(vehiclesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<Vehicle>();

  const onSubmit = async () => {
    try {
      await axios.post(`${BACKEND_URL}/add-vehicle`, getValues());
      // Update the vehicles list table
      setVehicles([...vehicles, getValues()]);
      toast({
        title: "Success!",
        description: "Vehicle added successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Oh No! 😥",
        description: "Vehicle with this this license plate already exists.",
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
      <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Vehicle</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Toyota Coaster"
                {...register("name", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>License Plate</FormLabel>
              <Input
                placeholder="LEZ-152"
                {...register("licensePlate", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Capacity</FormLabel>
              <Input
                type="number"
                placeholder="25"
                {...register("capacity", { required: "true" })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={!isValid}
              onClick={() => {
                setLoading(true);
                onSubmit();
              }}
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
            <Button onClick={onClose} isDisabled={loading ? true : false}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
