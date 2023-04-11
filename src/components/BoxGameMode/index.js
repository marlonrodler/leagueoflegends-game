import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
// import PopoverMode from "../PopoverMode";
import championsSummary from "../../services/championsSummary";

function BoxGameMode({ setGameMode }) {
  const [backgroundImg, setBackgroundImg] = useState('');

  const handleStartGame = (mode) => {
    setGameMode(mode);
  }

  useEffect(() => {
    if (backgroundImg === '') {
      handlerGetChampionsSummary();
    }
  }, [backgroundImg]);

  const handlerGetChampionsSummary = async () => {
    try {
      const response = await championsSummary.get();
      delete response.data[0];

      let newResponse = response.data;
      let currentIndex = newResponse.length, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newResponse[currentIndex], newResponse[randomIndex]] = [
          newResponse[randomIndex], newResponse[currentIndex]];
      }

      newResponse = newResponse.filter(function (element) {
        return element !== undefined;
      });

      setBackgroundImg(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${newResponse[0].id}/${newResponse[0].id}000.jpg`);
    } catch (err) {
      console.log('ERROR API: ', err);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      w='100vw'
      h='100vh'
      position={'fixed'}
      background={`url(${backgroundImg})`}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      backdropFilter={'blur(100px)'}
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
            Bem vindo Invocador!
          </Text>
          <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
            Desafie seus conhecimentos sobre os campeões do League of Legends.
          </Text>
          <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
            Escolha um modo de jogo:
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
          <Button
            onClick={() => handleStartGame('image')}
            colorScheme={'green'}
            w={'90px'}
          >
            Imagem
          </Button>
          
          <Button
            onClick={() => handleStartGame('audio')}
            colorScheme={'red'}
            w={'90px'}
          >
            Audio
          </Button>
          {/* <PopoverMode
            handleStartGame={handleStartGame}
            mode="image"
            buttonModeColor="green"
            buttonModeTitle="Imagem"
            textHelp="Neste modo você deverá acertar os campeões de acordo com a sua imagem."
            textExample=''
          />

          <PopoverMode
            handleStartGame={handleStartGame}
            mode="audio"
            buttonModeColor="red"
            buttonModeTitle="Audio"
            textHelp="Neste modo você deverá acertar os campeões de acordo com a sua voz."
            textExample=''
          /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default BoxGameMode;
