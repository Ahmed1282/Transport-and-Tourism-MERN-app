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
  InputRightElement,
  Checkbox,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton
} from '@chakra-ui/react';

const SimpleSignIn = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showError, setShowError] = useState(false); // State for showing error popup

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
    setShowError(false); // Reset the error state

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
      setShowError(true); // Show error popup on failed login
    }
  };

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        {/* Error Popup */}
        {showError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Invalid login information!</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowError(false)} />
          </Alert>
        )}

        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Log in to your account</Heading>
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
              {/* Email field */}
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
              {/* Password field */}
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
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
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
                Log In
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SimpleSignIn;
