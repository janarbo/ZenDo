import { Box, Input, Text, Button, FormControl, FormLabel, FormErrorMessage, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, IconButton } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../App';
import ForgotPasswordModal from '../components/Login/ForgotPasswordModal';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()


  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
  const[submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const[submitClickedPassword, setSubmitClickedPassword] = useState(false);
  const[email, setEmail] = useState('');
  const context = useOutletContext() as Context;




  const isErrorUsername = username === '' && submitClickedUsername;
  const isErrorPassword = password === '' && submitClickedPassword;


  const onChangeUsername = (e:any) => {
    setSubmitClickedUsername(false);
    setUsername(e.target.value);
  }

  const onChangePassword = (e:any) => {
    setSubmitClickedPassword(false);
    setPassword(e.target.value);
  }
  const onChangeEmail = (e:any) => {
    setEmail(e.target.value);

  }



  const handleSubmit = () =>{
   
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (username === '' || password === '') {
      return;
    }

    else {
       axios.post('http://localhost:3030/auth/login', {
        username,
        password,
      })
      .then ((response) => {
      const token = response.data.access_token;
      context.toggleLoggedIn();
      localStorage.setItem("access_token", token);

      setUsername('');
      setPassword('');

      setSubmitClickedUsername(false);
      setSubmitClickedPassword(false);

      navigate("/profile");
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: "subtle", // or "solid" for a solid background

      });

    }). catch((error) => {
      console.log('Login Error:', error); // Log the error response to see what the server is returning

        setUsername('');
        setPassword('');
        setError('');

        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);

        console.log('Login Failed', error);

        toast({
          title: 'Login Failed',
          description: "There was an error logging you into your account. Please try again!",
          status: 'error',
          duration: 3000,
          isClosable: true,
          variant: "subtle",
        });

       if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
       } else {
        setError('Login Failed, please check your credetials')
       }
      });
    }
  };

  return (
    <Box>
      <Text textAlign='center' mt={20} mb={4} fontSize={20}> Log into Your Account </Text>
        <Box
          maxW='60%'
          m='0 auto'
          display='flex'
          flexDirection='column'
          alignItems="center"
          gap={4}
        >
        <FormControl isInvalid={isErrorUsername} isRequired >
            <FormLabel>Username</FormLabel>
            <Input type='text' value={username} onChange={onChangeUsername} />
            {!isErrorUsername ? null: (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onChangePassword}
            />
            <IconButton
            aria-label={showPassword ? 'Hide password' : 'Show password'} // Accessibility label
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} // Icon to show based on password visibility state
            onClick={togglePasswordVisibility} // Toggle password visibility on click
            position="absolute"
            right="1rem"
            top="75%"
            transform="translateY(-50%)"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
          />
            {!isErrorPassword ? null: (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
        </FormControl>
        <Button bgColor='#E6E6FA' w="100%"  type='submit' onClick={handleSubmit} mt={2}>Submit</Button>
        </Box>
        <Box display='flex' gap={10} justifyContent='center' mt={6}>
          <Text lineHeight='40px' fontSize='14px'>Forgot your password?</Text>
          <Button bgColor='#E6E6FA' fontSize='14px' onClick={onOpen}>Reset Password</Button>
        </Box>
        <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />


    </Box>
  );
};

export default LogIn;
