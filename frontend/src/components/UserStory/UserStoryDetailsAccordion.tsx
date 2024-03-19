import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import TaskBox from "../Tasks/TaskBox";


type Props = {
    name: string;
    status: string;
    description: string;
    projectId: number;
    featureId: number;
    userStoryId: number;
    tasks: Task[];
    setProject: React.Dispatch<React.SetStateAction<Project>>
}

export type Task = {
    id: number;
    name: string;
    status: string;
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
const UserStoryDetailsAccordion = ({ name, status, description, featureId, projectId, userStoryId, tasks, setProject }: Props) => {

    const[storyStatus, setStoryStatus] = useState(status)


    return (
        <Accordion allowToggle color="grey">
            <AccordionItem border="1px">
                <h2>
                    <AccordionButton backgroundColor="rgba(234, 244, 252, 0.5)" display="flex" justifyContent="space-between" p={4}>
                        <Text flex={1} textAlign="left">{name}</Text>
                        <Text>{storyStatus}</Text>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} borderTop="1px" color="grey" p={0}>
                    <Box p={4} pb={12}>
                        {description}
                    </Box>
                    {tasks.map((task) => {
                        return <TaskBox task={task} setStoryStatus={setStoryStatus}/>
                    })}
                    <CreateTaskAccordion
                        featureId={featureId}
                        projectId={projectId}
                        userStoryId={userStoryId}
                        setProject={setProject}
                    />

                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )

}
export default UserStoryDetailsAccordion
