import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PopoverMode from "../PopoverMode";

function ModalPlay({ setDifficulty, setCounter, getChampions, setNumberHits, setStartPlay, setLoading }) {

  const handleStartGame = (diff) => {
    setLoading(true);
    setDifficulty(diff);
    handleSetDifficulty(diff);
    setNumberHits(0);
    setStartPlay(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleSetDifficulty = (difficulty) => {
    if (difficulty === 'yuumi') {
      setCounter(900);
      getChampions(true);
    } else if (difficulty === 'leesin') {
      setCounter(1200);
      getChampions(false);
    } else if (difficulty === 'tryhard') {
      setCounter(1500);
      getChampions(false);
    }
  }

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
          paddingX='24px'
          pt='16px'
        >
          <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='18px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>
            Prepare-se para o desafio!
          </Text>
          <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
            Eu duvido você acertar o nome de todos os Campeões do League of Legends?
          </Text>
          <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
            Escolha sua dificuldade:
          </Text>
        </Box>

        <Box
          paddingX='24px'
          pb='24px'
          pt='16px'
          w={'100%'}
          display='flex'
          alignItems='center'
          justifyContent='space-around'
        >
          <PopoverMode
            handleStartGame={handleStartGame}
            mode="tryhard"
            buttonModeColor="red"
            buttonModeTitle="Tryhard"
            textHelp="Neste modo as cartas estarão viradas, e você deverá colocar o nome do campeão e sua região sem espaços e sem acentos, contendo espaço somente entre o nome e região."
            textExample='Exemplo: "RITOGOMES BRASIL".'
          />

          <PopoverMode
            handleStartGame={handleStartGame}
            mode="leesin"
            buttonModeColor="orange"
            buttonModeTitle="Lee Sin"
            textHelp="Neste modo as cartas estarão viradas, e você deverá colocar somente o nome do campeão sem espaços e sem acentos."
            textExample='Exemplo: "RITOGOMES".'
          />

          <PopoverMode
            handleStartGame={handleStartGame}
            mode="yuumi"
            buttonModeColor="green"
            buttonModeTitle="Yuumi"
            textHelp="Neste modo os campeões estarão à mostra, e você deverá colocar somente o nome do campeão sem espaços e sem acentos."
            textExample='Exemplo: "RITOGOMES".'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ModalPlay;
