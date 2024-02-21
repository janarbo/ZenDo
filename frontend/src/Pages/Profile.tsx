import { Avatar, Box, Button, Center, Text, useToast, IconButton} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import UserDetailsRow from "../components/Profile/userDetailsRow";
import { Context } from "../App";
import axios from "axios";



export type Data = {
    email: string;
    name: string;
    username: string;
}


const Profile = () => {
    const loaderData = useLoaderData() as Data;
    const[data, setData] = useState(loaderData);
    const context = useOutletContext() as Context;

    const navigate = useNavigate();
    const toast = useToast();

    const logOut = () => {
        localStorage.removeItem('access_token');
        context.toggleLoggedIn();
        navigate('/log-in')
        toast({
            title: 'Success',
            description: `You have been logged out`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            variant: "subtle",
          });
    }

    const userDetailsRows = [
        { field: 'Name', value: data.name },
        { field: 'Email', value: data.email },
        { field: 'Username', value: data.username },
        { field: 'Password', value: '********' }

    ]

    const deleteAccount = () => {
        const token = localStorage.getItem("access_token")
        console.log("TOKEN", token)
        axios.post('http://localhost:3030/auth/delete-user', {},
        { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => {
            localStorage.removeItem("access_token");
            navigate('/sign-up')
            toast({
                title: 'Success',
                description: `Your account has been deleted!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: "subtle",
              });
        }).catch((error) => {
            toast({
                title: 'Error',
                description: `There was an error deleting your account, please try again!`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                variant: "subtle",
              });

        })

    }

    return (
    <Box>
        <Text textAlign='center' mt={20} mb={4} fontSize={20}> Account Details</Text>
        <Text textAlign='center'>Welcome, {data.name}! You can manage your account details here.
        </Text>
        <Box display='flex' m='0 auto'  w='60%' gap={10} py={20} >
            <Box>
                <Avatar  size="2xl" name={data.name} display='flex' alignItems='center' />
            </Box>
            <Box display="flex" w='100%' gap={3} flexDirection='column' >
                    {userDetailsRows.map((row, index) => (
                        <UserDetailsRow
                        key={index}
                        field={row.field}
                        value={row.value}
                        username={data.username}
                        setData={setData}
                        />
                    ))}
                </Box>
        </Box>
        <Box display='flex' gap={4} justifyContent='center'>
             <Button onClick={logOut}>Log out</Button>
             <Button onClick={deleteAccount}> Delete Accout</Button>
        </Box>
    </Box>
        );
}

export default Profile
