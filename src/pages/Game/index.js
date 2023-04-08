import { useState } from 'react';
import { Wrap } from '@chakra-ui/react';
import CardChampionsList from '../../components/CardChampionsList';
import SpinnerLoading from '../../components/SpinnerLoading';
import ModalPlay from '../../components/ModalPlay';
import ModalMessage from '../../components/ModalMessage';

function Game() {
  const [loading, setLoading] = useState(true);
  const [maxCounter, setMaxCounter] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [showChampion, setShowChampion] = useState(true);
  const [gameOver, setGameOver] = useState({ success: false, fail: false });
  const [restartGame, setRestartGame] = useState(false);
  const [finalCounter, setFinalCounter] = useState(0);
  const [finalTitle, setFinalTitle] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <Wrap w={'100%'} display={'flex'} pb={['170px']} backgroundColor='#0A0A0B' justify={'center'} justifyContent={'center'}>
      <CardChampionsList
        startGame={startGame}
        setLoading={setLoading}
        maxCounter={maxCounter}
        showChampion={showChampion}
        setGameOver={setGameOver}
        restartGame={restartGame}
        setRestartGame={setRestartGame}
        setStartGame={setStartGame}
        setFinalCounter={setFinalCounter}
        setFinalMessage={setFinalMessage}
        setFinalTitle={setFinalTitle}
        gameOver={gameOver}
        difficulty={difficulty}
      />
      {loading && <SpinnerLoading />}
      {(!startGame && !gameOver.fail && !gameOver.success) &&
        <ModalPlay
          setShowChampion={setShowChampion}
          setStartGame={setStartGame}
          setLoading={setLoading}
          setMaxCounter={setMaxCounter}
          setDifficulty={setDifficulty}
        />
      }
      {
        (gameOver.success || gameOver.fail) &&
        <ModalMessage
          gameOver={gameOver}
          setRestartGame={setRestartGame}
          finalCounter={finalCounter}
          maxCounter={maxCounter}
          setFinalTitle={setFinalTitle}
          setFinalMessage={setFinalMessage}
          finalTitle={finalTitle}
          finalMessage={finalMessage}
        />
      }
    </Wrap>
  )
}

export default Game;
