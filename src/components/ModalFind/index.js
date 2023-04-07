import { Box } from '@chakra-ui/react';

import TextTimer from '../TextTimer';
import TextMaxChamp from '../TextMaxChamp';
import InputFind from '../InputFind';

function ModalFind({ maxChampions, numberHits, setNumberHits, champions, setChampions, maxCounter, refChamp, setGameOver, setFinalCounter }) {

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
        <TextTimer maxCounter={maxCounter} setGameOver={setGameOver} setFinalCounter={setFinalCounter} />
        <TextMaxChamp maxChampions={maxChampions} numberHits={numberHits} />
      </Box>
      <Box
        w='100%'
        paddingY={'16px'}
      >
        <InputFind
          champions={champions}
          setChampions={setChampions}
          numberHits={numberHits}
          setNumberHits={setNumberHits}
          refChamp={refChamp}
        />
      </Box>
    </Box>
  )
}

export default ModalFind
