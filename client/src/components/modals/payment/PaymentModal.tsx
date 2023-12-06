import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Booking from "../../../lib/types/booking";

interface Props {
  booking: Booking;
}

export default function PaymentModal({ booking }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = () => {
    onClose();
    setPaymentStatus("paid");
  };

  return (
    <>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={onOpen}
        isDisabled={
          (booking?.status === "Confirmed" ? false : true) ||
          (paymentStatus === "paid" ? true : false)
        }
      >
        {paymentStatus === "" ? "Payment" : "Paid ✅"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride Fare: {booking?.fare}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
              <Input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <FormLabel htmlFor="cardDate">Date</FormLabel>
              <Input
                id="cardDate"
                name="cardDate"
                type="text"
                value={cardDate}
                onChange={(e) => setCardDate(e.target.value)}
              />
              <FormLabel htmlFor="cardCVC">CVC</FormLabel>
              <Input
                id="cardCVC"
                name="cardCVC"
                type="text"
                value={cardCVC}
                onChange={(e) => setCardCVC(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePayment}>
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
