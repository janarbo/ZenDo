import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@chakra-ui/react'

import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'

type NameObject = {
  name:string;
};

function App() {
  const[names, setNames] = useState ([]);
  const[inputName, setInputName] = useState();

  useEffect( () => {
     axios.get('http://localhost:3030/names').then((response) => {
     setNames(response.data);
    });
  },[]);

  const handleChange = (e:any) => {
    setInputName(e.target.value);


  }

  const handleClick = async() => {
    const response = await axios.post('http://localhost:3030/name',
    {name: inputName,
  });
    console.log('RESPONSE', response)
  }

  return (
      <>
      <Flex gap={4}  m={20}>
      <Input placeholder='Type your name...' onChange={handleChange} />
        <Button onClick={handleClick}>
          BUTTON
          </Button>
      </Flex>
      <Box>All Names</Box>
      {
        names.map((name: NameObject) =>{
            return<Text>{name?.name}</Text>;
      })}
      </>

  )

}

export default App;
