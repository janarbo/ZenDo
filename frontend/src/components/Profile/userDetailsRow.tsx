import { CheckIcon, EditIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text, Input, useToast } from "@chakra-ui/react"
import axios from "axios";
import React, { useState } from "react"
import { isInvalidEmail } from "../../Pages/SignUp";
import { Data } from '../../Pages/Profile';



type Props ={
    field: string;
    value: string;
    username: string;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}
const UserDetailsRow = ({field, value, username, setData}: Props) =>{
    const toast = useToast();
    const [updateField, setUpdateField] = useState(false)
    const [valueState, setValueState] = useState(value)


    const onChange = (e: any) => {
        setValueState(e.target.value);
    }


    const onClickEdit = () => {
        setUpdateField(!updateField);

    }

    const onClickCheck = () => {
        if (field === 'Email') {
            const invalidEmail = isInvalidEmail(valueState);
            if (invalidEmail) {
                toast({
                    title: 'ERROR',
                    description: 'Please enter a valid email!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                  });
                setValueState(value);
                return;
            }
        } else {
            if (valueState === '') {
                toast({
                    title: 'ERROR',
                    description: 'Please enter a valid value!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                });
                if (field !== "Password") {
                    setValueState(value);
                }

                return;

            }
        }
        const token = localStorage.getItem("access_token");

        setUpdateField(!updateField);

        axios.post('http://localhost:3030/auth/change-account-detail', {
            username: username,
            field: field.toLowerCase(),
            value: valueState,
          }, { headers: { Authorization: `Bearer ${token}`}}
        ).then((response) => {
            console.log('RESPONSE', response)
            setData(response.data);
            toast({
                title: 'Success!',
                description: 'We have updated your account details!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: "subtle",
              });
         })
         .catch((error) => {
            console.log("ERROR", error);
            toast({
                title: 'Error',
                description: 'There was an error, please try again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });

         })
    }

    return (
        <Box display='flex' gap={2}>
            <Text flex={1} lineHeight='32px'>{field}:</Text>
            {updateField ? (
                <Input
                flex={1}
                h='32px'
                value={valueState}
                onChange={onChange}
                type={field === 'Password' ? 'password' : 'text'}
            />
            ) : (
            <Text flex={1} lineHeight='32px'>{field === 'Password' ? '********' :valueState}</Text>
            )}
            <IconButton
                aria-label='Edit Name'
                icon={updateField ? <CheckIcon /> : <EditIcon />}
                size='sm'
                onClick={updateField? onClickCheck : onClickEdit}
            />
        </Box>
    )
}

export default UserDetailsRow;
