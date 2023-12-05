import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
} from "@chakra-ui/react";
import AddVehicleModalButton from "../../modals/AddVehicleModalButton";

export default function ManageVehicles() {
  return (
    <VStack mt={24}>
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
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
