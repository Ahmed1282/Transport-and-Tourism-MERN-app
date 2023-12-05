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
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Vehicle from "../../lib/types/vehicle";
import addVehicle from "../../lib/queries/post/addVehicle";

export default function AddVehicleModalButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<Vehicle>();

  const onSubmit = () => {
    addVehicle(getValues());
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
                // TODO Don't close if result is not successfull!
                onSubmit();
                onClose();
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
