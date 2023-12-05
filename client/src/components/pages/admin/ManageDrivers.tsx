import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Heading,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BACKEND_URL } from "../../../lib/constants";
import axios from "axios";
import { useAtom } from "jotai";
import { driversAtom } from "../../../lib/jotai/atoms";
import AddDriverModal from "../../modals/driver/AddDriverModal";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import DeleteDriverModal from "../../modals/driver/DeleteDriverModal";

export default function ManageDrivers() {
  const [drivers, setDrivers] = useAtom(driversAtom);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-drivers`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getDrivers().then((data) => setDrivers(data));
  }, []);

  return (
    <VStack mt={24} spacing={5}>
      <Heading>Drivers Management</Heading>
      <AddDriverModal>Add Driver</AddDriverModal>
      <TableContainer
        mt={5}
        alignSelf={"left"}
        hidden={drivers.length == 0 || drivers == undefined ? true : false}
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th isNumeric>Phone</Th>
              <Th>License Number</Th>
              <Th>Date Joined</Th>
              <Th>Available</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>

          <Tbody>
            {drivers.map((driver, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{driver.name}</Td>
                <Td isNumeric>{driver.phone}</Td>
                <Td>{driver.licenseNumber}</Td>
                <Td>{driver.dateJoined}</Td>
                <Td>
                  <Center>
                    {!driver.isBooked ? (
                      <Icon as={GiCheckMark} color={"green"} />
                    ) : (
                      <Icon as={RxCross2} color={"red"} />
                    )}
                  </Center>
                </Td>
                <Td>
                  <Center>
                    <DeleteDriverModal driverToRemove={driver} />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
