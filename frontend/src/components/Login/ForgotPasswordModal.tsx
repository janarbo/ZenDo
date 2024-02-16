import { Box, Text, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import axios from "axios";
import React, { useState } from "react"
import { BooleanLiteral } from "typescript"
import { isInvalidEmail } from "../../Pages/SignUp";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: Props)=> {
    const[email, setEmail] = useState('')
    const toast = useToast();

    const saveEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const submitEmail = () => {

        const invalidEmail = isInvalidEmail(email);
        if (invalidEmail) {
            toast({
                title: 'ERROR',
                description: 'Please enter a valid email!',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            } else {
            axios.post('http://localhost:3030/auth/reset-password', {
                email,
               })
               .then((response) => {
                 setEmail("");
                 console.log("RESPONSE", response)
                 toast({
                  title: 'Success',
                  description: 'Check your email account for further directions',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
               })
               .catch((error)=> {
                if (error.response.data.message === "email does not exist")
                {
                  toast({
                    title: 'Success',
                    description: "Check your email account for further direction",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                } else{
                  toast({
                    title: 'ERROR',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });

                }

               });}

        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box>
            <Text mb={4}>Enter the email address associated with your account:</Text>
            <Input type={'text'} onChange={saveEmail}/>

            </Box>
          </ModalBody>
            <Button mx={6} mb={5} mt={2} bgColor='#E6E6FA'  onClick={submitEmail}>
             Send Verification Email
            </Button>
        </ModalContent>
      </Modal>
    )
}
export default ForgotPasswordModal
function toast(arg0: { title: string; description: any; status: string; duration: number; isClosable: boolean; }) {
    throw new Error("Function not implemented.");
}
