import { Box, Input, Text, Button, FormControl, FormLabel, FormHelperText, FormErrorMessage, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
  const[submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const[submitClickedPassword, setSubmitClickedPassword] = useState(false);




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

  const handleSubmit = async (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);
    if (username === '' || password === '') {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3030/auth/login', {
        username,
        password
      });
      console.log('RESPONSE', response.status)

      if(response.status === 200 ) {
      console.log('Login Successful', response.data);
      setUsername('');
      setPassword('');
      navigate('/projects');
      toast({
        title: 'Login Successful',
        description: "Welcome Back",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    }
    } catch(error: any) {
      if (error.response && error.response.status === 401) {
        setUsername('');
        setPassword('');
        console.log('Login Failed', error);

        setError('Login Failed, Please check your credentials');
      } else {
        setUsername('');
        setPassword('');
        console.log('Login Failed', error);
        setError('Login Failed. Please try again later.');
      }
    }
  };

  return (
    <Box>
      <Text textAlign='center' mt={20} mb={4} fontSize={20}> Login </Text>
        <Box
          maxW='100%'
          m='0 auto'
          display='flex'
          flexDirection='column'
          alignItems="center"
          gap={4}

        >
        <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isErrorUsername} isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' value={username} onChange={onChangeUsername} />
            {!isErrorUsername ? null: (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' value={password} onChange={onChangePassword} />
            {!isErrorPassword ? null: (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
        </FormControl>
        <Button w="100%"  type='submit' mt={2}>Submit</Button>
        </form>

        </Box>
    </Box>
  );
};

export default LogIn;
