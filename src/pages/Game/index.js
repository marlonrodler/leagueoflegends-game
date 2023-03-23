// Todo:
// - [] - Guardar o "Como jogar" no localStorage
// - [] - Criar TEMA personalizado do Chakra

import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

import { Wrap } from '@chakra-ui/react';
import CardList from '../../components/CardList';
import ModalInput from '../../components/ModalInput';
import './styles.css';
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
  const [inputChampValue, setInputChampValue] = useState('');
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

  const handleFindChampions = (name) => {
    setInputChampValue(name);
    const newChampions = { ...champions };
    for (const key in newChampions) {
      let isHit = false;

      if (!newChampions[key].hit) {
        if (difficulty !== 'tryhard') {
          if (key.toLowerCase() === name.toLowerCase()) {
            isHit = true;
          }
        } else {
          const region = ((newChampions[key].region.toLowerCase())).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '');
          if ((name.toLowerCase()).indexOf(region) !== -1 && (name.toLowerCase()).indexOf(key.toLowerCase()) !== -1) {
            isHit = true;
          }
        }
      }

      if (isHit) {
        newChampions[key].active = true;
        newChampions[key].hit = true;
        setTimeout(() => refChamp[key].scrollIntoView({ behavior: 'smooth' }), 0);
        setInputChampValue('');
        setNumberHits(numberHits + 1);
        setChampions(newChampions);
        return;
      }
    }
  }

  useEffect(() => {
    if (maxChampions === 0) {
      getChampions(true);
    }

    if (startPlay) {
      const timer = counter > 0 && setInterval(() => {
        setCounter(counter - 1)

        const minutes = Math.floor((counter - 1) / 60);
        const seconds = (counter - 1) - minutes * 60;

        setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);

      if (counter === 0) {
        messageLose.description = `Você acertou ${numberHits} de ${maxChampions} campeões.`;
        setShowMessageLose(true);
      }
      else if (numberHits === maxChampions) {
        setShowMessageWin(true);
      }

      return () => clearInterval(timer);
    }
  }, [counter, startPlay, maxChampions, numberHits, messageLose]);

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

  const handleRestartGame = () => {
    setShowMessageLose(false);
    setShowMessageWin(false);
    setStartPlay(false);
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
            handleFindChampions={handleFindChampions}
            numberHits={numberHits}
            maxChampions={maxChampions}
            timer={timer}
            inputChampValue={inputChampValue}
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
            handleStartGame={handleStartGame}
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

          />
        )
      }
    </Wrap>
  )
}

export default Game;
