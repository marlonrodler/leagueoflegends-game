import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

import { Box, Wrap, WrapItem, Text, Input, Button, Spinner } from '@chakra-ui/react';
import questionImg from '../../assets/imgs/question-invert.png';
import './styles.css';

function Game() {
  const [champions, setChampions] = useState({});
  const [counter, setCounter] = useState(0);
  const [numberHits, setNumberHits] = useState(0);
  const [startPlay, setStartPlay] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState('');
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('');

  const refChamp = useRef(null);
  const refInputChamp = useRef(null);

  useEffect(() => {
    if (!Object.keys(champions).length)
      getChampions(true);
  }, [champions]);

  useEffect(() => {
    if (startPlay) {
      const timer = counter > 0 && setInterval(() => {
        setCounter(counter - 1)

        const minutes = Math.floor((counter - 1) / 60);
        const seconds = (counter - 1) - minutes * 60;

        setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [counter, startPlay]);

  const getChampions = async (isActive) => {
    try {
      var newResponse = {};
      const response = await api.get();
      for (const key in response.data) {
        newResponse[key] = { ...response.data[key], active: isActive, hit: false };
      }
      setChampions(newResponse);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleFindChampions = (name) => {
    const newChampions = { ...champions };
    for (const key in newChampions) {
      if (key.toLowerCase() === name.toLowerCase() && !newChampions[key].hit) {
        newChampions[key].active = true;
        newChampions[key].hit = true;
        setTimeout(() => refChamp[key].scrollIntoView({ behavior: 'smooth' }), 0);
        refInputChamp.current.value = '';
        setNumberHits(numberHits + 1);
      }
    }
    setChampions(newChampions);
  }

  const handleStartGame = (difficulty) => {
    setLoading(true);
    setDifficulty(difficulty);
    setTimeout(() => {
      setStartPlay(true);

      if (difficulty === 'leesin'){
        setCounter(1200);
        getChampions(false);
      } else if (difficulty === 'yuumi'){
        setCounter(900);
        getChampions(true);
      }

      console.log('champions:',champions);
      setNumberHits(0);
    }, 1000);

    setTimeout(() => {
      refInputChamp.current.focus();
      setGameStarted(true);
      setLoading(false);
    }, 2000);
  }

  return (
    <Wrap
      w={'100%'}
      pt={['16px', '50px']}
      pb={['16px', '160px']}
      paddingX={['4px', '20px']}
      justify='center'
      spacing={['16px', '24px']}
      backgroundColor='#0A0A0B'
    >
      {
        Object.entries(champions).map(([key, value]) => {
          return (
            <WrapItem ref={(champ) => { refChamp[key] = champ }} id={key} key={key} transition='all 0.5s ease' _hover={{ transform: ['', 'scale(1.1)'] }}>
              <Box
                backgroundPosition='center'
                backgroundImage={value.active ? value.urlImgLoading : questionImg}
                backgroundColor={value.active ? 'transparent' : '#2A2A2A'}
                backgroundRepeat='no-repeat'
                backgroundSize={value.active ? 'cover' : '200px'}
                display='flex'
                flexDirection='column-reverse'
                w={['306px', '200px']}
                h={['558px', '452px']}
                borderRadius='lg'
                overflow='hidden'
                border={value.active ? '' : '1px solid #927345'}
                transition={value.active ? 'transform 0.6s' : ''}
                transform={value.active ? 'rotateY(0deg)' : 'rotateY(180deg)'}
                _hover={{ border: '1px solid #927345' }}
              >
                <Box p='4'
                  backgroundColor='rgba(10,10,12,.9)'
                  borderTop='1px solid #927345'
                  display={!value.hit && difficulty === 'yuumi' ? 'none' : (value.active ? '' : 'none')}
                >
                  <Box
                    color='#937341'
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                    textTransform='uppercase'
                    textAlign='center'
                    letterSpacing='2px'
                  >
                    {value.name}
                  </Box>
                  <Box display='flex' justifyContent='center'>
                    <Text color='#c4b998'>{value.region}</Text>
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          )
        })
      }

      <Box
        display={startPlay ? 'flex' : 'none'}
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
        {
          gameStarted &&
          (
            <Box
              display='flex'
              justifyContent='space-around'
              alignItems='center'
              w='100%'
              h='100%'
              paddingX={'8px'}
              pt={'16px'}
            >
              <Text color='#c4b998' fontSize='16px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>{numberHits} / {Object.keys(champions).length}</Text>
              <Text color='#c4b998' fontSize='16px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>{timer}</Text>
            </Box>
          )
        }
        <Box
          w='100%'
          paddingY={'16px'}
        >
          <Input
            ref={refInputChamp}
            autoFocus
            textTransform={'uppercase'}
            placeholder='Encontre um campeão'
            color={'#c4b998'}
            _placeholder={{ opacity: 1, color: 'rgb(147, 115, 65, 0.6)' }}
            onChange={(e) => handleFindChampions(e.target.value)}
          />
        </Box>
      </Box>

      {
        loading &&
        (
          <Box
            position={'fixed'}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            top={'-12px'}
            zIndex={999}
            w='100vw'
            h='100vh'
            backgroundColor={'rgba(10,10,12,.9)'}
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
        )
      }

      {
        !startPlay &&
        (
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
                w={'100%'}
                display='flex'
                alignItems='center'
                justifyContent='space-around'
              >
                <Button
                  onClick={() => handleStartGame('tryhard')}
                  colorScheme='red'
                  w={'90px'}
                >
                  Tryhard
                </Button>
                <Button
                  onClick={() => handleStartGame('leesin')}
                  colorScheme='orange'
                  w={'90px'}
                >
                  Lee Sin
                </Button>
                <Button
                  onClick={() => handleStartGame('yuumi')}
                  colorScheme='green'
                  w={'90px'}
                >
                  Yuumi
                </Button>
              </Box>
            </Box>
          </Box>
        )
      }

    </Wrap>
  )
}

export default Game;
