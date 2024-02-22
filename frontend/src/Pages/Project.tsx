import { Box } from "@chakra-ui/react"
import React from "react"
import { useLoaderData, useParams } from "react-router-dom"

const Project = () => {
    const { id }  = useParams();
    const data = useLoaderData();
    console.log("Data", data)
    return (
        <Box>Project Page</Box>
    )
}


export default Project
