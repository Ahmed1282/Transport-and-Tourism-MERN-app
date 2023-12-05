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
} from "@chakra-ui/react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { BACKEND_URL } from "../../../lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";
import { routesAtom } from "../../../lib/jotai/atoms";
import Route from "../../../lib/types/Route";
import { useForm } from "react-hook-form";

interface Props {
  routeToEdit: Route;
}

export default function EditRouteModal({ routeToEdit }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [routes, setRoutes] = useAtom(routesAtom);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<Route>({
    defaultValues: routeToEdit,
  });

  const onSubmit = async () => {
    try {
      const updatedRoute: Route = { ...getValues(), code: routeToEdit.code };

      await axios.put(`${BACKEND_URL}/edit-route`, updatedRoute);
      // Update the routes list table

      const tempRoutes: Route[] = routes;
      const index = routes.findIndex(
        (route) => route.code === routeToEdit.code
      );
      tempRoutes[index] = updatedRoute;
      setRoutes([...tempRoutes]);

      toast({
        title: "Success!",
        description: "Route Updated successfully!",
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
          reset(routeToEdit);
          onOpen();
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Existing Route</ModalHeader>
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
              {loading ? <Spinner /> : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
