import { Text, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState } from "react"
import UserStoryDetailsAccordion from "../UserStory/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStory/CreateUserStoryAccordion";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
    featureDescription: string;
    featureId: number;
}
export type UserStory = {
    name: string;
    description: string;
    status: string;
}

const sampleUserStories = [
    {
        name: "User Story",
        description: "This is a description",
        status: "2/10",
    },
    {
        name: "User Story",
        description: "This is a description",
        status: "1/10",
    },
    {
        name: "User Story",
        description: "This is a description",
        status: "3/8",
    },

    {
        name: "User Story",
        description: "This is a description",
        status: "4/10",
    },
];


const FeatureModal = ({ isOpen, onClose, featureName, featureDescription, featureId }: Props) => {

    const [userStories, setUserStories] = useState(sampleUserStories)
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
                    {sampleUserStories.map((story, index) => {
                        return (
                                <UserStoryDetailsAccordion
                                    name={`${story.name} ${index + 1}`}
                                    status={story.status}
                                    description={story.description}
                                />
                        );
                    })}
                       <CreateUserStoryAccordion
                        userStories={userStories}
                        setUserStories={setUserStories}
                        featureId={featureId}
                    />

                    </Box>

                </Box>
            </ModalContent>
        </Modal >

    )
}


export default FeatureModal;
