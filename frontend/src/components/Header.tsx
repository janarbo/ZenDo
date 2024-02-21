import { Box, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';



const pages = [
    {name: 'Log In', path:'/log-in', showWhenLoggedIn: false},
    {name: 'Sign Up', path:'/sign-up', showWhenLoggedIn: false},
    {name: 'My Todos', path:'/projects', showWhenLoggedIn: true},
    {name: 'Account Details', path:'/profile', showWhenLoggedIn: true},

]
type Props = {
    loggedIn: boolean;
}

const hdStyle = {
    fontFamily: "Anta",
  }

const Header = ({loggedIn}: Props) =>{
    return (
        <Box p={1} display='flex' alignItems='center' borderBottom='1px solid #CBD5E0' height="105px">
            <Helmet>
                {/* <link href="https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap" rel="stylesheet" /> */}
                <link href="https://fonts.googleapis.com/css2?family=Anta&family=Protest+Revolution&display=swap" rel="stylesheet"></link>

            </Helmet>
            <Box p={2} display='flex' flex={1}>
                <Image  src="https://cdn.dribbble.com/users/3874609/screenshots/11220080/media/f79eb10c253049df5e1a184be4c70567.gif"
                alt='logo'
                borderRadius='0%'
                alignItems='center'
                width='auto'
                height='100px'
                />

                <Heading style={hdStyle} fontFamily='Lato, sans-serif' lineHeight='100px' ml={0} alignItems='center' fontSize={24}>ZenDo</Heading>
            </Box>
        <Menu >
                <MenuButton as={Box} p={2} cursor='pointer' _hover={{ bg: '#E6E6FA' }} borderRadius='md' width='224px'>
                    Menu
                </MenuButton>
                <MenuList w='19%' >
                    {pages.map((page) => {
                        if ((loggedIn && page.showWhenLoggedIn) || (!loggedIn && !page.showWhenLoggedIn)) {
                            return (
                                <MenuItem key={page.name} as={Link} to={page.path} borderRadius='md' _hover={{ bg: '#E6E6FA' }}>
                                    {page.name}
                                </MenuItem>
                            );
                        } else {
                            return null;
                        }
                    })}
                </MenuList>
            </Menu>


    </Box>
    );
}

export default Header
