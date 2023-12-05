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
  Text,
  IconButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BACKEND_URL } from "../../lib/constants";
import { driversAtom } from "../../lib/jotai/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import Driver from "../../lib/types/Driver";

interface Props {
  driverToRemove: Driver;
}

export default function DeleteVehicleModal({
  driverToRemove: driverToRemove,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setDrivers = useAtom(driversAtom)[1];
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    // Sending delete request to backend
    const deleteVehicle = async () => {
      setLoading(true);
      try {
        await axios.delete(
          `${BACKEND_URL}/delete-driver/${driverToRemove.licenseNumber}`
        );

        setDrivers((drivers) =>
          drivers.filter((driver) => driver !== driverToRemove)
        );
        toast({
          title: "Success!",
          description: "Driver removed successfully!",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Oh No! 😥",
          description: "Something went wrong! Unable to delete driver.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    await deleteVehicle();
    setLoading(false);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Remove Driver"
        icon={<MdDelete />}
        size={"sm"}
        rounded={"full"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to proceed with the deletion process? This
              action can NOT be reverted!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              variant={"ghost"}
              mr={3}
              onClick={onClose}
              isDisabled={loading ? true : false}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                setLoading(true);
                onSubmit();
              }}
            >
              {loading ? <Spinner /> : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
