import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Data } from "./Profile";
import CreateProjectAccordion from "../components/Projects/CreateProjectAccordion";




export type Project = {
    name: string;
    description?: string;
    status: string;

};

const fakeProjects: Project[] = [
    {name: 'Projects A',
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     status: "To do",

    },
    {name: 'Projects B',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "To do",
   },
   {name: 'Projects C',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "To do",
   },
   {name: 'Projects D',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "To do",
   },
   {name: 'Projects E',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Done",
   }
]



const Projects = () => {
    const data = useLoaderData() as Data;
    const [projects, setProjects] = useState(fakeProjects);

    return (
        <Box>
        <Text textAlign='center' mt={20} mb={4} fontSize={20}> {data.name}'s Projects</Text>
        <Box m={10}>
        {projects.map((project) => {
                return (
                    <Box display="flex" border="1px solid" p={5} mb={6}>
                        <Text w="15%">{project.name}</Text>
                        <Text  noOfLines={1} flex={1}>{project.description}</Text>
                        <Text w="15%" ml={10}>{project.status}</Text>
                    </Box>
                );
        })}
        <CreateProjectAccordion projects={projects} setProjects={setProjects} />


        </Box>


        </Box>
    )
};

export default Projects;
