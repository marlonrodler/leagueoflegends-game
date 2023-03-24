import React from "react";
import { Box } from "@chakra-ui/react";
import InputFind from "../InputFind";
import TextMaxChamp from "../TextMaxChamp";
import TextTimer from "../TextTimer";

function InputBox({ numberHits, maxChampions, counter, setCounter, setTimer, timer, champions, setChampions, setNumberHits, refChamp, difficulty }) {
  
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
        <TextTimer counter={counter} setCounter={setCounter} setTimer={setTimer} timer={timer} numberHits={numberHits} maxChampions={maxChampions} />
        <TextMaxChamp maxChampions={maxChampions} numberHits={numberHits} />
      </Box>
      <Box
        w='100%'
        paddingY={'16px'}
      >
        <InputFind champions={champions} setChampions={setChampions} numberHits={numberHits} setNumberHits={setNumberHits} refChamp={refChamp} difficulty={difficulty} />
      </Box>
    </Box>
  )
}

export default InputBox;
