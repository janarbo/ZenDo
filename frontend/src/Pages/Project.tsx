import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect, useState, } from "react"
import { useLoaderData } from "react-router-dom"
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../components/Features/CreateFeatureAccordion";
import FeatureModal, { UserStory } from "../components/Features/FeatureModal";
import { Data } from "./Profile";
import { cp } from "fs";
import FeatureBox from "../components/Features/FeatureBox";


export type Feature = {

    name: string;
    status: "To Do" | "In Progress" | "Done!";
    userStoryCount: number;
    completedUserStories: number;
    description?: string;
    id: number;
    userStories: UserStory[];


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
    const loaderData= useLoaderData() as ProjectType;

    const [project, setProject] = useState(loaderData);






    return (
        <Box m={10}  >
            <Box border="1px solid transparent" >
            {/* backgroundColor='#eaebfc' */}
                <Text mt={5} mb={2} fontSize={20} color="grey">
                    {project.name}
                </Text>
                <Text  mb={5} color="grey">{project.description || "There is no project description"}</Text>
            </Box>
            <Box display="flex" gap={10} h="80vh" mt={10} >
                {columns.map((column) => {
                    return (
                        <Box flex={1} border="" mb={20} key={column.name} backgroundColor="rgba(234, 244, 252, 0.5)">
                            <Text fontSize={20} textAlign="center" mt={2}>
                                {column.name}
                            </Text>
                            {project.features.map((feature) => {
                                if (column.name === feature.status) {
                                    return <FeatureBox feature={feature} projectId={project.id} setProject={setProject} key={feature.id}/>
                                } else {
                                    return null
                                }
                            })}
                            <Box p={4} >
                                {
                                    column.name === "To Do" && (
                                        <CreateFeatureAccordion
                                            features={project.features}
                                            setProject={setProject}
                                            projectId={project.id}
                                        />)
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
function useAuth(): { user: any; loading: any; error: any; } {
    throw new Error("Function not implemented.");
}
