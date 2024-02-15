import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


const pages = [
    {name: 'Log In', path:'/log-in', showWhenLoggedIn: false},
    {name: 'Sign Up', path:'/sign-up', showWhenLoggedIn: false},
    {name: 'My Todos', path:'/projects', showWhenLoggedIn: true},
    {name: 'Account Details', path:'/profile', showWhenLoggedIn: true},

]
type Props = {
    loggedIn: boolean;
}
const Header = ({loggedIn}: Props) =>{
    return (
        <Box p={4} display='flex' alignItems='center'>
            <Box p={4} display='flex' flex={1}>
                <Image  src="https://cdn.dribbble.com/users/3874609/screenshots/11220080/media/f79eb10c253049df5e1a184be4c70567.gif"
                alt='logo'
                borderRadius='50%'
                alignItems='center'
                width='auto'  // Set width to auto to maintain the original width
                height='120px'
                />

                <Heading  fontFamily='Lato, sans-serif' lineHeight='120px' ml={0} alignItems='center' fontSize={24}>ZenDo</Heading>
            </Box>
        <Box display='flex' justifyContent='space-around' w='50%'>
            {pages.map((page)  => {
                if(
                    (loggedIn && page.showWhenLoggedIn) ||
                    (!loggedIn && !page.showWhenLoggedIn)
            ){return (
                    <Link to={page.path} key={page.name}>
                    <Box>{page.name}</Box>
                    </Link>
                )} else {
                    return null;
                }
            })}
        </Box>
    </Box>
    );
}

export default Header
