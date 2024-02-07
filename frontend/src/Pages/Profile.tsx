import { Box, Button, Text, useToast} from "@chakra-ui/react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Profile = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    const toast = useToast();

    console.log("LOADER DATA", data)

    const onSubmit = () => {
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
        <Button onClick={onSubmit}>Log out</Button>
    </Box>
        );
}

export default Profile
