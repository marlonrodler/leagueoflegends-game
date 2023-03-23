import React from "react";
import { Box } from "@chakra-ui/react";
import InputFind from "../InputFind";
import TextMaxChamp from "../TextMaxChamp";
import TextTimer from "../TextTimer";

function InputBox({ handleFindChampions, numberHits, maxChampions, timer, inputChampValue }) {
  
  return (
    <Box
      display={'flex'}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      w='340px'
      bottom={0}
      position={'fixed'}
      paddingX='16px'
      pb='16px'
      backgroundColor={'#0A0A0B'}
      borderRadius='lg'
      border='1px solid #927345'
    >
      <Box
        display={'flex'}
        justifyContent='space-around'
        alignItems='center'
        w='100%'
        h='100%'
        paddingX={'8px'}
        pt={'16px'}
      >
        <TextTimer timer={timer} />
        <TextMaxChamp maxChampions={maxChampions} numberHits={numberHits} />
      </Box>
      <Box
        w='100%'
        paddingY={'16px'}
      >
        <InputFind handleFindChampions={handleFindChampions} inputChampValue={inputChampValue} />
      </Box>
    </Box>
  )
}

export default InputBox;
