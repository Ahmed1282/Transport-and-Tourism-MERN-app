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
} from "@chakra-ui/react";
import AddVehicleModal from "../../modals/vehicle/AddVehicleModal";
import { useEffect } from "react";
import { BACKEND_URL } from "../../../lib/constants";
import axios from "axios";
import DeleteVehicleModal from "../../modals/vehicle/DeleteVehicleModal";
import { useAtom } from "jotai";
import { vehiclesAtom } from "../../../lib/jotai/atoms";

export default function ManageBookings() {
  const [vehicles, setVehicles] = useAtom(vehiclesAtom);

  // useEffect(() => {
  //   const getVehicles = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/get-vehicles`);
  //       return response.data;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getVehicles().then((data) => setVehicles(data));
  // }, []);

  return (
    <VStack mt={24} spacing={5}>
      <Heading>Bookings Management</Heading>
      <TableContainer
        mt={5}
        alignSelf={"left"}
        hidden={vehicles.length == 0 || vehicles == undefined ? true : false}
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th isNumeric>Capacity</Th>
              <Th>LICENSE PLATE</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>

          <Tbody>
            {vehicles.map((vehicle, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{vehicle.name}</Td>
                <Td isNumeric>{vehicle.capacity}</Td>
                <Td>{vehicle.licensePlate}</Td>
                <Td>
                  <Center>
                    <DeleteVehicleModal vehicleToRemove={vehicle} />
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
