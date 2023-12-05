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
import { useAtom } from "jotai";
import { driversAtom } from "../../lib/jotai/atoms";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import Driver from "../../lib/types/Driver";

export default function AddDriverModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drivers, setDrivers] = useAtom(driversAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<Driver>();

  const onSubmit = async () => {
    try {
      await axios.post(`${BACKEND_URL}/add-driver`, getValues());
      // Update the vehicles list table
      setDrivers([...drivers, getValues()]);
      toast({
        title: "Success!",
        description: "Driver added successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Oh No! 😥",
        description: "Driver with this this license plate already exists.",
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
          <ModalHeader>Add New Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Bilal Ahmad"
                {...register("name", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>License Number</FormLabel>
              <Input
                type="text"
                placeholder="LEZASDWASSS!"
                {...register("licenseNumber", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                placeholder="03449856523"
                {...register("phone", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date Joined</FormLabel>
              <Input
                type="date"
                placeholder="25-03-2021"
                {...register("dateJoined", { required: "true" })}
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
