import { Box } from "@chakra-ui/react"
import React, { useState } from "react"
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const {access_token, id} = useParams();
    const[newPassword, setNewPassword] = useState('')

    
    console.log('Params', access_token, id)
    return(
        <Box>RESET PASSWORD</Box>
    )
}

export default ResetPassword;
