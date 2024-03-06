import { Box, Text, useDisclosure } from "@chakra-ui/react"
import { Feature } from "../../Pages/Project"
import React from "react";
import FeatureModal from "./FeatureModal";
import { Project } from "../../Pages/Projects";


type Props = {
    feature: Feature;
    projectId: number;
    setProject: React.Dispatch<React.SetStateAction<Project>>
}
const FeatureBox = ({feature, projectId, setProject}: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log("FEATURE", feature)
    return (
        <>
        <Box
            bgColor="##eaf4fc"//#eaebfc
            p={4}
            m={4}
            border="1px solid #d4d6d8"
            display="flex"
            justifyContent="space-between"
            onClick={onOpen}
            _hover={{ cursor: "pointer", bg:"#eaf4fc"}}

            key={feature.id}
        >
            <Text>{feature.name}</Text>
            <Text>
                {feature.completedUserStories}/{feature.userStoryCount}
            </Text>
            </Box>
            <FeatureModal
                isOpen={isOpen}
                onClose={onClose}
                featureName={feature.name}
                featureDescription={feature.description || "There is no description..."}
                featureId={feature.id}
                projectId={projectId}
                stories={feature.userStories}
                setProject={setProject}
            />
    </>

    )
}

export default FeatureBox
