import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import axios from "axios";
import { UserStory } from "../Features/FeatureModal";




type Props = {

    featureId: number;
    projectId: number;
    userStoryId: number;

}



const CreateTaskAccordion = ({ featureId, projectId, userStoryId }: Props) => {

    const [name, setName] = useState("");
    const [submitClickedName, setSubmitClickedName] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const isErrorName = name === "" && submitClickedName;
    const toast = useToast()





    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitClickedName(false)

        setName(e.target.value);
    }



    const onSubmit = () => {
        setSubmitClickedName(true)

        if (name !== "") {
            setIsOpen(false);
            console.log("PRJECTID", projectId)
            console.log("FEATUREID", featureId)
            console.log("USER STORY ID", userStoryId)

            const token = localStorage.getItem("access_token")

            axios.post('http://localhost:3030/auth/create-task',
                {
                    name,
                    projectId,
                    featureId,
                    userStoryId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((response) => {
                setName("");
                setSubmitClickedName(false);


                toast({
                    title: 'Success',
                    description: `Your developer task has been created!`,
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
            <AccordionItem borderTop="1px">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton onClick={() => setIsOpen(!isOpen)} h="58px" >
                                {isExpanded ? (
                                    <MinusIcon fontSize='12px' />
                                ) : (
                                    <AddIcon fontSize='12px' />
                                )}
                                <Box as="span" flex='1' textAlign='left' ml={4} >
                                    Add a Task
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} borderTop="1px solid">
                            <FormControl isInvalid={isErrorName} isRequired  mb={4}>
                                <FormLabel>Task Name:</FormLabel>
                                <Input type="text" value={name} onChange={onChangeName} />
                                {!isErrorName ? null : (
                                    <FormErrorMessage>Developer task name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button  w="100%" onClick={onSubmit}>Create a Task</Button>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    )
}

export default CreateTaskAccordion;

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; variant: string; }) {
    throw new Error("Function not implemented.");
}
