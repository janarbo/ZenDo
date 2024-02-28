import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import React, { useState } from "react"
import axios from "axios";
import { Feature } from "../../Pages/Project";
import { useLoaderData } from "react-router-dom";
import { UserStory } from "../Features/FeatureModal";




type Props = {
    userStories: UserStory[];
    setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
    featureId: number;
}



const CreateUserStoryAccordion = ({ userStories, setUserStories, featureId }: Props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitClickedName, setSubmitClickedName] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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

            console.log("NAME", name)
            console.log("D", description)

            const token = localStorage.getItem("access_token")
            const userId = localStorage.getItem('id');


            axios.post('http://localhost:3030/auth/create-user-story',
                {
                    name,
                    description,
                    featureId,
                    userId: Number(userId)

                },
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((response) => {
                setUserStories([...userStories, response.data]);
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
            <AccordionItem border="1px solid">
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
                                    Add a User Story
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} borderTop="1px solid">
                            <FormControl isInvalid={isErrorName} isRequired  >
                                <FormLabel>User Story Name:</FormLabel>
                                <Input type="text" value={name} onChange={onChangeName} />
                                {!isErrorName ? null : (
                                    <FormErrorMessage>User Story name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={description} onChange={onChangeDescription} />
                                {!isErrorName ? null : (
                                    <FormErrorMessage>Description is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button w="100%" onClick={onSubmit}>Create a User Story</Button>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>

    )
}

export default CreateUserStoryAccordion;

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; variant: string; }) {
    throw new Error("Function not implemented.");
}
