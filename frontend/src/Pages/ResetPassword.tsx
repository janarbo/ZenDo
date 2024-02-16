import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const params = useParams();
    console.log("PARAMS", params)
    const {access_token, id} = useParams();
    const[password, setPassword] = useState('')
    const[secondPassword, setSecondPassword] = useState('')

    const[submitPassword, setSubmitPassword] = useState(false);
    const[submitSecondPassword, setSubmitSecondPassword] = useState(false);

    const isErrorPassword = password === "" && submitPassword;
    const isErrorSecondPassword = password !== secondPassword && submitSecondPassword;

    const onChangePassword = (e:any) => {
        setSubmitPassword(false);
        setSubmitSecondPassword(false);
        setPassword(e.target.value);

    }

    const onChangeSecondPassword = (e:any) => {
        setSubmitSecondPassword(false);
        setSecondPassword(e.target.value);
    }

    const onSubmit = () => {
        console.log('Password', password)
        console.log("Second Pass", secondPassword)
        // setPassword('');
        // setSecondPassword('');

        setSubmitPassword(true);
        setSubmitSecondPassword(true);
    }

    console.log('Params', access_token, id)
    return(
        <Box>
      <Text textAlign='center' mt={20} mb={4} fontSize={20}>Reset Your Password </Text>
        <Box
          maxW='60%'
          m='0 auto'
          display='flex'
          flexDirection='column'
          alignItems="center"
          gap={4}
        >


        <FormControl isInvalid={isErrorPassword} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' value={password} onChange={onChangePassword} />
            {!isErrorPassword ? null: (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
        </FormControl>

        <FormControl isInvalid={isErrorSecondPassword} isRequired>
            <FormLabel>Re-enter Password</FormLabel>
            <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
            {!isErrorSecondPassword ? null: (
              <FormErrorMessage>Password must match.</FormErrorMessage>
            )}
        </FormControl>
        <Button bgColor='#E6E6FA' w="100%"  type='submit' onClick={onSubmit} mt={2}>Submit</Button>
        </Box>



    </Box>
    )
}

export default ResetPassword;
