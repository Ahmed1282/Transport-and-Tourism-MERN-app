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
import { BACKEND_URL } from "../../../lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";
import { routesAtom } from "../../../lib/jotai/atoms";
import Route from "../../../lib/types/Route";

interface Props {
  routeToRemove: Route;
}

export default function DeleteRouteModal({ routeToRemove }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setRoutes = useAtom(routesAtom)[1];
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    // Sending delete request to backend
    const deleteRoute = async () => {
      setLoading(true);
      try {
        await axios.delete(`${BACKEND_URL}/delete-route/${routeToRemove.code}`);

        setRoutes((routes) =>
          routes.filter((route) => route !== routeToRemove)
        );
        toast({
          title: "Success!",
          description: "Route removed successfully!",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Oh No! 😥",
          description: "Something went wrong! Unable to delete Route.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    await deleteRoute();
    setLoading(false);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Remove Route"
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
