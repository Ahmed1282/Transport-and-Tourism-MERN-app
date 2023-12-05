import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

const SimpleSignUp = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await axios.post('http://localhost:3000/signup', requestData);
      console.log(response.data);
      navigate('/login'); // Redirect to /login on successful signup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign up for an account</Heading>
          </Stack>
          <VStack
            as="form"
            onSubmit={handleSubmit}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input 
                  rounded="md" 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input 
                  rounded="md" 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input 
                  rounded="md" 
                  type="tel" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input 
                  rounded="md" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input 
                    rounded="md" 
                    type={show ? 'text' : 'password'} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input 
                    rounded="md" 
                    type={show ? 'text' : 'password'} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                type="submit"
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
              >
                Sign up
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SimpleSignUp;
