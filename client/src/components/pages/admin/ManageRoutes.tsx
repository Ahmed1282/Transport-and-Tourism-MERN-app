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
import { useEffect } from "react";
import { BACKEND_URL } from "../../../lib/constants";
import axios from "axios";
import { useAtom } from "jotai";
import { routesAtom } from "../../../lib/jotai/atoms";
import AddRouteModal from "../../modals/routes/AddRouteModal";
import DeleteRouteModal from "../../modals/routes/DeleteRouteModal";

export default function ManageRoutes() {
  const [routes, setRoute] = useAtom(routesAtom);

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-routes`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getRoutes().then((data) => setRoute(data));
  }, []);

  return (
    <VStack mt={24} spacing={5}>
      <Heading>Route Management</Heading>
      <AddRouteModal>Add Route</AddRouteModal>
      <TableContainer
        mt={5}
        alignSelf={"left"}
        hidden={routes.length == 0 || routes == undefined ? true : false}
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Route Code</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Fare</Th>
              <Th>Details</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>

          <Tbody>
            {routes.map((route, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{route.code}</Td>
                <Td>{route.origin}</Td>
                <Td>{route.destination}</Td>
                <Td>{route.fare}</Td>
                <Td>{route.description}</Td>
                <Td>
                  <Center>
                    <DeleteRouteModal routeToRemove={route} />
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
