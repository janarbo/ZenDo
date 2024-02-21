import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import React, { useState } from "react"
import { Project } from "../../Pages/Project"




type Props = {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}



const CreateProjectAccordion = ({projects, setProjects}: Props) => {

    const [name, setName] = useState("");
    const[description, setDescription] = useState("");
    const [submitClickedName, setSubmitClickedName] = useState(false);

    const isErrorName = name === "" && submitClickedName;

    const onChangeName = (e:any) => {
        setSubmitClickedName(false)

        setName(e.target.value);
    }

    const onChangeDescription = (e: any) => {
        setDescription(e.target.value);

    }

    const onSubmit = () => {
        setSubmitClickedName(true)

        console.log("NAME", name);
        console.log("DESCRIPTION", description);
        setProjects([...projects, {
            name,
            description,
            status: "to do",
        }])

        setName('');
        setDescription("");
        setSubmitClickedName(false);
    }


    return (
        <Accordion allowMultiple>
        <AccordionItem border="1px solid">
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton  h="58px" >
                {isExpanded ? (
                    <MinusIcon fontSize='12px' />
                  ) : (
                    <AddIcon fontSize='12px' />
                  )}
                  <Box as="span" flex='1' textAlign='left' ml={4} >
                    Add a project
                  </Box>
                </AccordionButton>
              </h2>
                <AccordionPanel pb={4} borderTop="1px solid">
                    <FormControl isInvalid={isErrorName} isRequired  >
                    <FormLabel>Project name</FormLabel>
                    <Input type="text" value={name} onChange={onChangeName} />
                    {!isErrorName ? null: (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
                    </FormControl>
                    <FormControl mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea  value={description} onChange={onChangeDescription} />
                    {!isErrorName ? null: (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
                    </FormControl>
                    <Button w="100%" onClick={onSubmit}>Create Project</Button>
                </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

    )
}

export default CreateProjectAccordion;
