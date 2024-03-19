import { Box, Button, IconButton, Input, Text, useToast } from "@chakra-ui/react"
import { Task } from "../UserStory/UserStoryDetailsAccordion"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";


type Props = {
    task: Task;
    setStoryStatus:  React.Dispatch<React.SetStateAction<string>>;
}

const TaskBox = ({ task, setStoryStatus }: Props) => {
    const [taskStatus, setTaskStatus] = useState(task.status)
    const toast = useToast()
    const navigate = useNavigate()


    const[taskName, setTaskName] = useState(task.name);
    const [updateName, setUpdateName] = useState(false);
;


    const onChange = (e: any) => {
        setTaskName(e.target.value);
    }


    const onClickEdit = () => {
        setUpdateName(!updateName);

    }


    const updateTask = (field: "status" | "name", value: string) => {

        if (taskName === '') {
            toast({
                title: 'ERROR',
                description: 'Please enter a valid task name!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                variant: "subtle",
            });
            setTaskName(task.name);
            return;
        }


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

                setStoryStatus(response.data)
                setUpdateName(false)

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
            gap={4}

        >
        <Box flex={1}>
        {updateName ? (
            <Input
            flex={1}
            h='38px'
            value={taskName}
            onChange={onChange}
            type={'text'}
        />
        ) : (
            <Text flex={1}>{task.name}</Text>
        )}
        </Box>
        <IconButton
            aria-label='Edit Name'
            icon={updateName ? <CheckIcon /> : <EditIcon />}
            size='md'
            onClick={updateName ? () => {
                updateTask ("name", taskName);
            }
            : onClickEdit}
        />

            <Button w="118px"  onClick={toggleTaskStatus}>{taskStatus}</Button>
        </Box>
    )
}


export default TaskBox;
