import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

function ModalMessage({
  handleRestartGame,
  showMessageLose,
  messageLose,
  messageWin,
}) {

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      top={'-12px'}
      w='100vw'
      h='100vh'
      position={'fixed'}
      backgroundColor={'rgba(10,10,12,.6)'}
    >
      <Box
        maxW={'400px'}
        m='16px'
        backgroundColor={'rgba(10,10,12,.9)'}
        position={'fixed'}
        borderRadius='lg'
        border='1px solid #927345'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          p='16px'
        >
          <Box>
            <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='18px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>
              {
                showMessageLose ? messageLose.title : messageWin.title
              }
            </Text>
            <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
              {
                showMessageLose ? messageLose.description : messageWin.description
              }
            </Text>
          </Box>
          <Box
            pt={'16px'}
          >
            <Button
              onClick={() => handleRestartGame()}
              colorScheme='yellow'
            >
              JOGAR NOVAMENTE
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ModalMessage;
