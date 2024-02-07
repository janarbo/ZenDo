import React from 'react'
import {  ChakraProvider } from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'


function App() {
  return (
    <ChakraProvider>
      <Outlet/>

    </ChakraProvider>
  );
}

export default App;
