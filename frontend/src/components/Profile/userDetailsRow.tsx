import { EditIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text } from "@chakra-ui/react"
import React from "react"



type Props ={
    field: string;
    value: string;
}
const UserDetailsRow = ({field, value}: Props) =>{
    return (
    <Box display='flex'>
        <Text flex={1} lineHeight='32px'>{field}:</Text>
        <Text flex={1} lineHeight='32px'>{value}</Text>
        <IconButton aria-label='Edit name' icon={<EditIcon />} size='sm' />
    </Box>


    )
}

export default UserDetailsRow;
