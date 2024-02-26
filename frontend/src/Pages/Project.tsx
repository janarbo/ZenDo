import { Box, Text, useDisclosure } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../components/Features/CreateFeatureAccordion";
import FeatureModal from "../components/Features/FeatureModal";


export type Feature = {
    name: string,
    status: "To Do" | "In Progress" | "Done!",
    userStoryCount: number;
    completedUserStories: number;
    description?: string;
}

const columns = [
    {
        name: "To Do"
    },
    {
        name: "In Progress"
    },
    {
        name: "Done!"
    },
]


const Project = () => {


    const data = useLoaderData() as ProjectType[];
    const project = data[0];
    const [features, setFeatures] = useState(project.features)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFeature, setSelectedFeature]= useState<Feature>(features[0])






    return (
        <Box m={10}  >
            <Box>
                <Text mt={20} mb={4} fontSize={20} >
                    {project.name}
                </Text>
                <Text>{project.description || "There is no project description"}</Text>
            </Box>
            <Box display="flex" gap={10} h="100vh" mt={20}>
                {columns.map((column) => {
                    return (
                        <Box flex={1} border="1px" mb={20}>
                            <Text fontSize={20} textAlign="center" mt={2}>
                                {column.name}
                            </Text>
                            {features.map((feature) => {
                                if (column.name === feature.status) {
                                    return (
                                        <Box
                                            border="1px"
                                            p={4}
                                            m={4}
                                            display="flex"
                                            justifyContent="space-between"
                                            onClick={onOpen}
                                            _hover={{ cursor: "pointer"}}
                                        >
                                            <Text>{feature.name}</Text>
                                            <Text>{feature.completedUserStories}/{feature.userStoryCount}</Text>
                                        </Box>
                                    )
                                } else {
                                    return null
                                }
                            })}
                            <Box p={4} >
                                {
                                    column.name === "To Do" && (
                                        <CreateFeatureAccordion
                                            features={features}
                                            setFeatures={setFeatures}
                                            projectId={project.id}


                                        />)
                                }
                            </Box>
                        </Box>
                    )
                })}

            </Box>
            <FeatureModal
            isOpen={isOpen}
            onClose={onClose}
            featureName={selectedFeature.name}
            featureDescription={selectedFeature.description || "There is no description..."}/>
        </Box>
    )
}


export default Project
