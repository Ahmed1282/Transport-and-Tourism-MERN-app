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
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BACKEND_URL } from "../../lib/constants";
import Vehicle from "../../lib/types/vehicle";
import { vehiclesAtom } from "../../lib/jotai/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

interface Props {
  vehicleToRemove: Vehicle;
}

export default function DeleteVehicleModal({ vehicleToRemove }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setVehicles = useAtom(vehiclesAtom)[1];
  const [loading, setLoading] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Remove Vehicle"
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
              onClick={async () => {
                
                // Sending delete request to backend
                const deleteVehicle = async () => {
                  setLoading(true);
                  try {
                    await axios.delete(
                      `${BACKEND_URL}/delete-vehicle/${vehicleToRemove.licensePlate}`
                    );

                    setVehicles((vehicles) =>
                      vehicles.filter((vehicle) => vehicle !== vehicleToRemove)
                    );
                  } catch (e) {
                    console.log(e);
                  }
                };

                await deleteVehicle();
                setLoading(false);
                onClose();
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
