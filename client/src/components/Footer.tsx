import { Text, Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bottom={0}
      position={"fixed"}
      w="full"
      p={4}
      bg="gray.200"
      textAlign="center"
    >
      <Text>&copy; {new Date().getFullYear()} Uzair Transport and Tourism</Text>
    </Box>
  );
}
