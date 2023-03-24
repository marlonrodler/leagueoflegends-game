// Todo:
// - [] - Guardar o "Como jogar" no localStorage
// - [] - Criar TEMA personalizado do Chakra

import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

import { Wrap } from '@chakra-ui/react';
import CardList from '../../components/CardList';
import ModalInput from '../../components/ModalInput';
import SpinnerLoading from '../../components/SpinnerLoading';
import ModalPlay from '../../components/ModalPlay';
import ModalMessage from '../../components/ModalMessage';

function Game() {
  const [champions, setChampions] = useState({});
  const [counter, setCounter] = useState(0);
  const [numberHits, setNumberHits] = useState(0);
  const [startPlay, setStartPlay] = useState(false);
  const [timer, setTimer] = useState('');
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [showMessageLose, setShowMessageLose] = useState(false);
  const [showMessageWin, setShowMessageWin] = useState(false);
  const [maxChampions, setMaxChampions] = useState(0);
  const [messageLose] = useState({
    title: 'Fora de Micão hein posição!',
    description: ''
  });
  const [messageWin] = useState({
    title: 'Parabéns!',
    description: 'Você acertou todos os campeões.'
  });

  const refChamp = useRef(null);

  useEffect(() => {
    if (maxChampions === 0) {
      getChampions(true);
    }

    if (startPlay) {
      if (counter === 0) {
        messageLose.description = `Você acertou ${numberHits} de ${maxChampions} campeões.`;
        setShowMessageLose(true);
      }
      else if (numberHits === maxChampions) {
        setShowMessageWin(true);
      }
    }
  }, [counter, startPlay, maxChampions, numberHits, messageLose, setShowMessageLose, setShowMessageWin]);


  const handleRestartGame = () => {
    setShowMessageLose(false);
    setShowMessageWin(false);
    setStartPlay(false);
  }

  const getChampions = async (isActive) => {
    try {
      var newResponse = {};
      const response = await api.get();
      for (const key in response.data) {
        newResponse[key] = { ...response.data[key], active: isActive, hit: false };
      }
      setChampions(newResponse);
      setMaxChampions(Object.keys(newResponse).length);
    } catch (error) {
      console.log('error:', error);
    }
  }

  return (
    <Wrap
      w={'100%'}
      pt={['16px', '50px']}
      pb={['170px']}
      paddingX={['4px', '20px']}
      justify='center'
      spacing={['16px', '24px']}
      backgroundColor='#0A0A0B'
    >
      <CardList
        champs={champions}
        refChamp={refChamp}
        difficulty={difficulty}
      />

      {
        startPlay && (
          <ModalInput
            numberHits={numberHits} 
            maxChampions={maxChampions} 
            counter={counter} 
            setCounter={setCounter} 
            setTimer={setTimer} 
            timer={timer} 
            champions={champions} 
            setChampions={setChampions} 
            setNumberHits={setNumberHits} 
            refChamp={refChamp} 
            difficulty={difficulty}
          />
        )
      }

      {
        loading &&
        (
          <SpinnerLoading />
        )
      }

      {
        !startPlay &&
        (
          <ModalPlay
            setDifficulty={setDifficulty}
            setCounter={setCounter}
            getChampions={getChampions}
            setNumberHits={setNumberHits}
            setStartPlay={setStartPlay}
            setLoading={setLoading}
          />
        )
      }

      {
        (showMessageLose || showMessageWin) &&
        (
          <ModalMessage
            handleRestartGame={handleRestartGame}
            showMessageLose={showMessageLose}
            messageLose={messageLose}
            messageWin={messageWin}
            startPlay={startPlay}
            counter={counter}
            numberHits={numberHits}
            maxChampions={maxChampions}
            setShowMessageLose={setShowMessageLose}
            setShowMessageWin={setShowMessageWin}
          />
        )
      }
    </Wrap>
  )
}

export default Game;
