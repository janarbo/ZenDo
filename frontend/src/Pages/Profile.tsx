import { Avatar, Box, Button, Center, Text, useToast, IconButton} from "@chakra-ui/react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserDetailsRow from "../components/Profile/userDetailsRow";



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

    const userDetailsRows = [
        { field: 'Name', value: data.name },
        { field: 'Email', value: data.email },
        { field: 'Username', value: data.username },
        { field: 'Password', value: '********' }

    ]

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
                    {/* Map over the userDetailsRows array to render UserDetailsRow dynamically */}
                    {userDetailsRows.map((row, index) => (
                        <UserDetailsRow key={index} field={row.field} value={row.value} />
                    ))}
                </Box>
            {/* <Box display="flex" w='100%' gap={3} flexDirection='column' >
                <UserDetailsRow field='Name' value={data.name} />
                <UserDetailsRow field='Email' value={data.email} />
                <UserDetailsRow field='Username' value={data.username} />
                <UserDetailsRow field='Password' value='********' />
         </Box> */}
        </Box>
        <Box display='flex' gap={4} justifyContent='center'>
             <Button onClick={logOut}>Log out</Button>
             <Button onClick={()=> {}}> Delete Accout</Button>

        </Box>


    </Box>
        );
}

export default Profile
