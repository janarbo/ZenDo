import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text} from "@chakra-ui/react"
import React from "react"


type Props = {
    name: string;
    status: string;
    description: string;
}
const UserStoryDetailsAccordion = ({name, status, description}: Props) => {
    return (
        <Accordion allowToggle color="grey">
                <AccordionItem border="1px">
                    <h2>
                    <AccordionButton display="flex" justifyContent="space-between" p={4}>
                        <Text flex={1} textAlign="left">{name}</Text>
                        <Text>{status}</Text>

                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} borderTop="1px" color="grey">{description}

                    </AccordionPanel>
                </AccordionItem>
        </Accordion>
    )

}
export default UserStoryDetailsAccordion
