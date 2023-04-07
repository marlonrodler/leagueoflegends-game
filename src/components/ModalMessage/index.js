import { useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

function ModalMessage({
  setRestartGame,
  gameOver,
  finalCounter,
  maxCounter,
  setFinalTitle,
  setFinalMessage,
  finalTitle,
  finalMessage
}) {
  

  useEffect(() => {
    if (gameOver.success === true) {
      const calcCounter = maxCounter - finalCounter;
      const minutes = Math.floor((calcCounter - 1) / 60);
      const seconds = (calcCounter - 1) - minutes * 60;
      const counterFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setFinalTitle('Parabéns!');
      setFinalMessage(`Você acertou todos os campeões em um tempo de ${counterFormatted}.`);
    }
  }, [gameOver.success, maxCounter, finalCounter, setFinalMessage, setFinalTitle]);

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
                finalTitle
              }
            </Text>
            <Text p={'8px'} textAlign={'center'} color='#c4b998' fontSize='16px' fontWeight='bold' letterSpacing='2px'>
              {
                finalMessage
              }
            </Text>
          </Box>
          <Box
            pt={'16px'}
          >
            <Button
              onClick={() => setRestartGame(true)}
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
