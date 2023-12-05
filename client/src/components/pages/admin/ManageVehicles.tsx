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
  IconButton,
  Center,
} from "@chakra-ui/react";
import AddVehicleModalButton from "../../modals/AddVehicleModalButton";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../lib/constants";
import axios from "axios";
import Vehicle from "../../../lib/types/vehicle";
import { MdDelete } from "react-icons/md";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-vehicles`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getVehicles().then((data) => setVehicles(data));
  }, []);

  // console.log(vehicles)

  if (vehicles.length == 0 || vehicles == undefined)
    return <div>No Vehicles data available...</div>;

  return (
    <VStack mt={24} spacing={5}>
      <Heading>Vehicle Management</Heading>
      <AddVehicleModalButton>Add Vehicle</AddVehicleModalButton>
      <TableContainer mt={5} alignSelf={"left"}>
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
                    <IconButton
                      aria-label="Remove Vehicle"
                      icon={<MdDelete />}
                      size={"sm"}
                      rounded={"full"}
                      onClick={() => {
                        // TODO Add Remove functionality
                      }}
                    />
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
