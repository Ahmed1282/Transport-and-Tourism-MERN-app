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
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../lib/constants";
import { routesAtom } from "../../../lib/jotai/atoms";
import Route from "../../../lib/types/Route";
import { generateCode } from "../../../lib/util";

export default function AddRouteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [routes, setRoutes] = useAtom(routesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<Route>();

  const onSubmit = async () => {
    try {
      const newRoute: Route = { ...getValues(), code: generateCode() };
      await axios.post(`${BACKEND_URL}/add-route`, newRoute);
      // Update the routes list table
      setRoutes([...routes, getValues()]);
      toast({
        title: "Success!",
        description: "Route added successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Oh No! 😥",
        description: "Route with this this license plate already exists.",
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
          <ModalHeader>Add New Route</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Origin</FormLabel>
              <Input
                placeholder="Islamabad"
                {...register("origin", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Destination</FormLabel>
              <Input
                placeholder="Skardu"
                {...register("destination", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fare</FormLabel>
              <Input
                type="number"
                placeholder="2500"
                {...register("fare", { required: "true" })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Via Northern bypass"
                {...register("description", { required: "true" })}
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
