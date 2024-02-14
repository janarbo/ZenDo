import { Avatar, Box, Button, Center, Text, useToast} from "@chakra-ui/react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";


type Data = {
    email: string;
    name: string;
    username: string;
}
const Profile = () => {
    const data = useLoaderData() as Data;
    const navigate = useNavigate();
    const toast = useToast();

    console.log("LOADER DATA", data)

    const logOut = () => {
        localStorage.removeItem('access_token');
        navigate('/log-in')
        toast({
            title: 'Success',
            description: `You have been logged out`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
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
            <Box display="flex" w='100%' gap={5} flexDirection='column' >
                <Box display='flex'>
                    <Text w='40%'>Name:</Text>
                    <Text>{data.name}</Text>
                </Box>
                <Box  display='flex'>
                    <Text w='40%'>Username:</Text>
                    <Text>{data.username}</Text>
                </Box>
                <Box  display='flex'>
                    <Text w='40%'>Email:</Text>
                    <Text>{data.email}</Text>
                </Box>
                <Box display='flex'>
                    <Text w='40%'>Password:</Text>
                    <Text>*******</Text>
                </Box>
            </Box>
        </Box>
        <Button onClick={logOut}>Log out</Button>
    
    </Box>
        );
}

export default Profile
