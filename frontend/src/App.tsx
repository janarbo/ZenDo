import React from 'react'
import axios from 'axios'

import { Box, Button, ChakraProvider } from '@chakra-ui/react'

function App() {
  const handleClick = async() => {
    const response = await axios.get('http://localhost:3030/');
    console.log('RESPONSE', response)
  }

  return (
    <ChakraProvider>
      <Box>ZenDo</Box>
      <Button onClick={handleClick}>BUTTON</Button>

    </ChakraProvider>
  )

}

export default App;
