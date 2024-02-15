import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


const pages = [
    {name: 'Login', path:'/log-in'},
    {name: 'Sign up', path:'/sign-up'},
    {name: 'Projects', path:'/projects'},
    {name: 'Account Details', path:'/profile'},

]
const Header = () =>{
    return (
        <Box p={4} display='flex' alignItems='center'>
            <Box p={4} display='flex' flex={1}>
                <Image  src="https://static.vecteezy.com/system/resources/previews/000/356/165/original/vector-checklist-icon.jpg"
                alt='logo'
                boxSize='60px'
                borderRadius='30%'
                alignItems='center'/>
                <Heading lineHeight='60px' alignItems='center' fontSize={24}>Project Planning Tool</Heading>
            </Box>
        <Box display='flex' justifyContent='space-around' w='50%'>
            {pages.map((page) => {
                return (
                    <Link to={page.path}>
                    <Box>{page.name}</Box>
                    </Link>
                )
            })}
        </Box>
    </Box>
    );
}

export default Header
