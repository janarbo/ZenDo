import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text, Button } from "@chakra-ui/react"
import React from "react"
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";


type Props = {
    name: string;
    status: string;
    description: string;
    projectId: number;
    featureId: number;
    userStoryId: number;
}

const sampleDevTasks = [
    {
        name: "Developer Task 1",
        status: "To Do"
    },

    {
        name: "Developer Task 1",
        status: "To Do"
    },

    {
        name: "Developer Task 1",
        status: "To Do"
    },

    {
        name: "Developer Task 1",
        status: "To Do"
    }
]
const UserStoryDetailsAccordion = ({ name, status, description, featureId, projectId, userStoryId }: Props) => {
    return (
        <Accordion allowToggle color="grey">
            <AccordionItem border="1px">
                <h2>
                    <AccordionButton display="flex" justifyContent="space-between" p={4}>
                        <Text flex={1} textAlign="left">{name}</Text>
                        <Text>{status}</Text>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} borderTop="1px" color="grey" p={0}>
                    <Box p={4} pb={12}>
                        {description}
                    </Box>
                    {sampleDevTasks.map((task) => {
                        return (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                borderTop="1px"
                                alignItems="center"
                                px={4}
                                py={2}
                            >
                                <Text>{task.name}</Text>
                                <Button>{task.status}</Button>
                            </Box>
                        );
                    })}
                    <CreateTaskAccordion featureId={featureId} projectId={projectId} userStoryId={userStoryId} />

                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )

}
export default UserStoryDetailsAccordion
