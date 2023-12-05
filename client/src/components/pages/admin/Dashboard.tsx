import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Container mt={24}>
      <SimpleGrid
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {menuItems.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <Heading size="md">{item.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{item.desc}</Text>
            </CardBody>
            <CardFooter>
              <Button as={Link} to={item.path}>
                View here
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

interface MenuItem {
  title: string;
  desc: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Manage Vehicles",
    desc: "View and manage all vehicles",
    path: "/dashboard/manage-vehicles",
  },
  {
    title: "Manage Drivers",
    desc: "View and manage all drivers",
    path: "/dashboard/manage-drivers",
  },
  {
    title: "Manage Bookings",
    desc: "View and manage all bookings",
    path: "/dashboard/manage-bookings",
  },
  {
    title: "Manage Routes",
    desc: "View and manage all routes",
    path: "/dashboard/manage-routes",
  },
];
