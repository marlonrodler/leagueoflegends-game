// import { useState } from 'react';
import GameImage from '../GameImage'
// import GameAudio from '../GameAudio'
// import BoxGameMode from '../../components/BoxGameMode'
import { Wrap } from '@chakra-ui/react';

function Home() {
  // const [gameMode, setGameMode] = useState('');

  return (
    <Wrap
      w={'100%'}
      display={'flex'}
      pb={['170px']}
      backgroundColor='#0A0A0B'
      justify={'center'}
      justifyContent={'center'}
    >
      {/* {gameMode === '' && <BoxGameMode setGameMode={setGameMode} />}
      {gameMode === 'image' && <GameImage /> }
      {gameMode === 'audio' && <GameAudio /> } */}
      <GameImage />
    </Wrap>
  );
}

export default Home;
