import React from 'react'
import TempBg from '/temp_home_bg.jpg'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate =useNavigate()

  return (
    <>
      <Box>
        <Flex direction={['column', 'column', 'row', 'row']}>
          <Image
            src={TempBg}
            height={["50%", "50%", "30%", "30%"]}
            width={["70%", "50%", "40%", "30%"]}
            ml={["10%", "10%", "5%", "5%"]}
            mt={["30%", "30%", "10%", "10%"]}

          >

          </Image>
          <Box
            mt={["15px","15px","150px","250px"]}
            ml={["20px","20px","30px","40px"]}
          >
             <Text 
             fontFamily="serif"
             fontSize={["15px","15px","20px","20px"]}
             color="blue.500"
             >
              Due to Insufficient relevent data from <Text as="span" color="orange.500" fontFamily="serif">Mohan Kumar</Text>, <br></br>crafting the <Text as="span" color="orange.500">Home page</Text> is postponed...</Text>
             <Button
             mt={["10px","10px","10px","10px"]}
             bg="teal"
             onClick={()=>{navigate('/products')}}
             >
              Explore Products !!</Button>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Home
