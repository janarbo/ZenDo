import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { Task } from "../UserStory/UserStoryDetailsAccordion"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";


type Props = {
    task: Task;
    setProject: React.Dispatch<React.SetStateAction<Project>>
}

const TaskBox = ({ task, setProject}: Props) => {
    const [taskStatus, setTaskStatus] = useState(task.status)
    const toast = useToast()
    const navigate = useNavigate()


    const updateTask = (field: "status" | "name", value: string) => {


        const token = localStorage.getItem("access_token")

        axios.post('http://localhost:3030/auth/update-task',
            {
                field,
                value,
                taskId: task.id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log("RESPONSE", response.data)
                setProject(response.data)

                toast({
                    title: 'Success',
                    description: `Your task status has been updated!`,
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



    const toggleTaskStatus = () => {
        if (taskStatus === "To Do") {
            setTaskStatus("In Progress")
            updateTask("status", "In Progress")
        } else if (taskStatus === "In Progress") {
            setTaskStatus("Done!")
            updateTask("status", "Done!")
        } else {
            setTaskStatus("To Do")
            updateTask("status", "To Do")
        }


    }
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            borderTop="1px"
            alignItems="center"
            px={4}
            py={2}
            key={task.name}

        >
            <Text>{task.name}</Text>
            <Button onClick={toggleTaskStatus}>{taskStatus}</Button>
        </Box>
    )
}


export default TaskBox
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; variant: string; }) {
    throw new Error("Function not implemented.");
}
