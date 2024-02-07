import { Box, Input, Text, Button, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
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

  const handleSubmit = () =>{
    console.log("USERNAME", username);
    console.log("PASSWORD", password);
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
      const token = response.data;
      localStorage.setItem("token", token);
      setUsername('');
      setPassword('');

      setSubmitClickedUsername(false);
      setSubmitClickedPassword(false);

      navigate("/projects");
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    }). catch((error) => {
        setUsername('');
        setPassword('');

        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);

        console.log('Login Failed', error);

        toast({
          title: 'Login Failed',
          description: "There was an error loggingg you into your account. Please try again!",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        setError('Login Failed, Please check your credentials');
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
            <Input type='password' value={password} onChange={onChangePassword} />
            {!isErrorPassword ? null: (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
        </FormControl>
        <Button w="100%"  type='submit' onClick={handleSubmit} mt={2}>Submit</Button>

        </Box>
    </Box>
  );
};

export default LogIn;
