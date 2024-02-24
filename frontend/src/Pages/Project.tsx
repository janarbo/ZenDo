import { Box, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../components/Projects/CreateFeatureAccordion";


export type Feature = {
    name: string,
    status: "To Do" | "In Progress" | "Done!",
    userStoryCount: number;
    completedUserStories: number;
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

const sampleFeatures: Feature[] = [
    {
        name: "Feature A",
        status: "To Do",
        userStoryCount: 10,
        completedUserStories: 0,
    },
    {
        name: "Feature B",
        status: "Done!",
        userStoryCount: 15,
        completedUserStories: 15,
    },
    {
        name: "Feature C",
        status: "To Do",
        userStoryCount: 3,
        completedUserStories: 0,
    },
    {
        name: "Feature D",
        status: "In Progress",
        userStoryCount: 10,
        completedUserStories: 5,
    },
    {
        name: "Feature E",
        status: "To Do",
        userStoryCount: 10,
        completedUserStories: 0,
    },
]

const Project = () => {

    const data = useLoaderData() as ProjectType[];
    const project = data[0];
    const [features, setFeatures] = useState(sampleFeatures)

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
                                console.log("COLUMN NAMe", column.name)
                                console.log("STATUS", feature.status)
                                if (column.name === feature.status) {
                                    return (
                                        <Box
                                            border="1px"
                                            p={4}
                                            m={4}
                                            display="flex"
                                            justifyContent="space-between"
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
                                            setFeatures={setFeatures} />)
                                }
                            </Box>
                        </Box>
                    )
                })}

            </Box>
        </Box>
    )
}


export default Project
