import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import axios from "axios";
import  { Feature } from "../../Pages/Project";
import { useLoaderData } from "react-router-dom";
import { Project } from "../../Pages/Projects";





type Props = {
    features: Feature[];
    setProject: React.Dispatch<React.SetStateAction<Project>>;
    projectId: number;

}



const CreateFeatureAccordion = ({ features, setProject, projectId}: Props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitClickedName, setSubmitClickedName] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();


    const isErrorName = name === "" && submitClickedName;

    const onChangeName = (e: any) => {
        setSubmitClickedName(false)

        setName(e.target.value);
    }

    const onChangeDescription = (e: any) => {
        setDescription(e.target.value);

    }

    const onSubmit = () => {
        setSubmitClickedName(true)

        if (name !== "") {
            setIsOpen(false);

            const token = localStorage.getItem("access_token")

            axios.post('http://localhost:3030/auth/create-feature',
                {
                    name,
                    description,
                    projectId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((response) => {
                setProject(response.data);
                setName("");
                setDescription("");
                setSubmitClickedName(false);
                toast({
                    title: 'Success',
                    description: `Your feature has been created!`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                });
            })
                .catch((error) => {
                    console.log("ERROR", error);
                })
        }
    }


    return (
        <Accordion allowToggle index={isOpen ? 0 : 1}>
            <AccordionItem border="1px solid #d4d6d8">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton onClick={() => setIsOpen(!isOpen)} h="58px" bgColor="#eaebfc" >
                                {isExpanded ? (
                                    <MinusIcon fontSize='12px' />
                                ) : (
                                    <AddIcon fontSize='12px' />
                                )}
                                <Box as="span" flex='1' textAlign='left' ml={4} >
                                    Add a feature
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} borderTop="1px solid ">
                            <FormControl isInvalid={isErrorName} isRequired  >
                                <FormLabel>Feature Name:</FormLabel>
                                <Input type="text" value={name} onChange={onChangeName} />
                                {!isErrorName ? null : (
                                    <FormErrorMessage>Feature name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={description} onChange={onChangeDescription} />
                                {!isErrorName ? null : (
                                    <FormErrorMessage>Description is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button w="100%" onClick={onSubmit} >Create Feature</Button>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>

    )
}

export default CreateFeatureAccordion;

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; variant: string; }) {
    throw new Error("Function not implemented.");
}
