import React from 'react';
import { useState } from 'react';
import { Box, Input, Text, Button, FormControl, FormLabel, FormErrorMessage, useToast, IconButton} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../App';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export const isInvalidEmail = (email:string) => {

  const emailFormat =  /\S+@\S+\.\S+/;
  if (email.match(emailFormat) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

const isInvalidPass2 = (pass1: string, pass2: string) => {
  if (pass2 !== pass1) {
    return true;
  } else {
    return false;
  }
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleSecondPasswordVisibility = () => setShowSecondPassword(!showSecondPassword);

  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[secondPassword, setSecondPassword] = useState('')

  const[submitClickedName, setSubmitClickedName] = useState(false);
  const[submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const[submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const[submitClickedPassword, setSubmitClickedPassword] = useState(false);
  const[submitClickedSecondPassword, setSubmitClickedSecondPassword] = useState(false);



  const isErrorName = name === '' && submitClickedName;
  const isErrorEmail = isInvalidEmail(email) && submitClickedEmail;
  const isErrorUsername = username === '' && submitClickedUsername;
  const isErrorPassword = password === '' && submitClickedPassword;
  const isErrorSecondPassword =
    isInvalidPass2(password, secondPassword) && submitClickedSecondPassword;



  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };
  const onChangeEmail = (e: any) => {
    setSubmitClickedEmail(false);
    setEmail(e.target.value);
  };

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false);
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false);
    setPassword(e.target.value);
  };


  const onChangeSecondPassword = (e: any) => {
    setSubmitClickedSecondPassword(false);
    setSecondPassword(e.target.value);
  };


  const onSubmit = () => {
    setSubmitClickedName(true);
    setSubmitClickedEmail(true);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);
    setSubmitClickedSecondPassword(true);

    if (name === '' ||
        isInvalidEmail(email) ||
        username === '' ||
        password === '' ||
        secondPassword !== password ||
        secondPassword === ''
    ) {
      return;
    } else {
      axios.post('http://localhost:3030/auth/signup', {
        name,
        email,
        username,
        password,
      }).then((response) => {
        const token = response.data.access_token;
        context.toggleLoggedIn();
        localStorage.setItem('access_token', token);

        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setSecondPassword('');
        setSubmitClickedName(false);
        setSubmitClickedEmail(false);
        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);
        setSubmitClickedSecondPassword(false);

        navigate('/profile');

        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          variant: "subtle",
        });
      })
      .catch((error) => {
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setSecondPassword('');
        setSubmitClickedName(false);
        setSubmitClickedEmail(false);
        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);
        setSubmitClickedSecondPassword(false);

        console.log('ERROR', error);

        toast({
          title: 'ERROR',
          description: error.response.data.message,
          // or add message: "We are not able to create your account, please try again!"
          status: 'error',
          duration: 3000,
          variant: "subtle",
        });

      })

    }
  }



  return (
     <Box mb="100px">
      <Text textAlign='center' mt={20} mb={4} fontSize={20}>Create an Account </Text>
      <Box
        maxW='75%'
        m='0 auto'
        display='flex'
        flexDirection='column'
        alignItems="center"
        gap={4}
      >
         <FormControl isInvalid={isErrorName} isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' value={name} onChange={onChangeName} />
            {!isErrorName ? null: (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
        </FormControl>

        <FormControl isInvalid={isErrorEmail} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' value={email} onChange={onChangeEmail} />
            {!isErrorEmail ? null: (
              <FormErrorMessage>A valid email is required.</FormErrorMessage>
            )}
        </FormControl>

        <FormControl isInvalid={isErrorUsername} isRequired>
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
              pr="10rem"/>
              {!isErrorPassword ? null: (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'} // Accessibility label
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} // Icon to show based on password visibility state
              onClick={togglePasswordVisibility} // Toggle password visibility on click
              position="absolute"
              right="0rem"
              top="75%"
              transform="translateY(-50%)"
              bg="transparent"
              _hover={{ bg: 'transparent' }}
            />
        </FormControl>

        <FormControl isInvalid={isErrorSecondPassword} isRequired>
            <FormLabel>Re-enter Password</FormLabel>
            <Input type={showSecondPassword ? 'text' : 'password'} value={secondPassword} onChange={onChangeSecondPassword} />
            <IconButton
              aria-label={showSecondPassword ? 'Hide password' : 'Show password'} // Accessibility label
              icon={showSecondPassword ? <ViewOffIcon /> : <ViewIcon />} // Icon to show based on password visibility state
              onClick={toggleSecondPasswordVisibility} // Toggle password visibility on click
              position="absolute"
              right="0rem"
              top="75%"
              transform="translateY(-50%)"
              bg="transparent"
              _hover={{ bg: 'transparent' }}
            />
            {!isErrorSecondPassword ? null: (
              <FormErrorMessage>Password must match.</FormErrorMessage>
            )}
        </FormControl>

        <Button w="100%" bgColor='#E6E6FA' onClick={onSubmit}>Submit</Button>
      </Box>
     </Box>
  );
};

export default SignUp;
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
  throw new Error('Function not implemented.');
}
