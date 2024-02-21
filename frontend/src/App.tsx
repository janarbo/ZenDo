import React, { useState } from 'react'
import {  ChakraProvider } from '@chakra-ui/react'
import {Outlet, useLoaderData} from 'react-router-dom'
import Header from './components/Header';

type Data = {
  email: string;
  name: string;
  username: string;
}

export type Context = {
  loggedIn : boolean;
  toggleLoggedIn:() => void;
}

function App() {
  const data = useLoaderData() as Data || undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  }

  const context: Context = {
    loggedIn,
    toggleLoggedIn,
  }


  return (
    <ChakraProvider>
      <Header loggedIn={loggedIn}/>
      <Outlet context={context}/>
    </ChakraProvider>
  );
}

export default App;
