import { Text, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import UserStoryDetailsAccordion, { Task } from "../UserStory/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStory/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";
import { setSyntheticLeadingComments } from "typescript";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
    featureDescription: string;
    featureId: number;
    projectId: number;
    stories: UserStory[];
    setProject: React.Dispatch<React.SetStateAction<Project>>


}
export type UserStory = {
    name: string;
    description: string;
    status: string;
    id: number;
    tasks: Task[];
    completedTasks: number;
    taskCount: number;

}



const FeatureModal = ({
        isOpen,
        onClose,
        featureName,
        featureDescription,
        featureId,
        projectId,
        stories,
        setProject
    }: Props) => {




    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered  >
            <ModalOverlay />
            <ModalContent minW="75%" minH="75%">

                <Box m={10}>
                    <Box mb={20}>
                        <Text mb={4} fontSize={18}>
                            {featureName}
                        </Text>
                        <Text fontSize={15}>
                            {featureDescription}
                        </Text>
                    </Box>
                    <ModalCloseButton />
                    <Box display="flex" flexDirection="column" gap={4}>
                        {stories.map((story) => {
                            return (
                                <UserStoryDetailsAccordion
                                    name={story.name}
                                    status={`${story.completedTasks}/${story.taskCount}`}
                                    description={story.description}
                                    featureId={featureId}
                                    userStoryId={story.id}
                                    projectId={projectId}
                                    tasks={story.tasks}
                                    key={story.id}
                                    setProject={setProject}
                                />
                            );
                        })}
                        <CreateUserStoryAccordion
                            featureId={featureId}
                            projectId={projectId}
                            setProject={setProject}
                        />
                    </Box>
                </Box>
            </ModalContent>
        </Modal >

    )
}


export default FeatureModal;
