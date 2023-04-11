import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PopoverMode from "../PopoverMode";

function ModalPlay(props) {

  const handleStartGame = (diff) => {
    props.setLoading(true);
    props.setDifficulty(diff);
    handleSetDifficulty(diff);
    props.setStartGame(true);

    setTimeout(() => {
      props.setLoading(false);
    }, 1000);
  }

  const handleSetDifficulty = (difficulty) => {
    if (difficulty === 'yuumi') {
      props.setMaxCounter(900);
    } else if (difficulty === 'leesin') {
      props.setMaxCounter(1200);
      props.setShowChampion(false);
    }
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
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
            mode="leesin"
            buttonModeColor="orange"
            buttonModeTitle="Lee Sin"
            textHelp="Nesta dificuldade as cartas estarão viradas, e você deverá colocar somente o nome do campeão."
            textExample='Exemplo: "RITO GOMES".'
          />

          <PopoverMode
            handleStartGame={handleStartGame}
            mode="yuumi"
            buttonModeColor="green"
            buttonModeTitle="Yuumi"
            textHelp="Nesta dificuldade os campeões estarão à mostra, e você deverá colocar somente o nome do campeão."
            textExample='Exemplo: "RITO GOMES".'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ModalPlay;
