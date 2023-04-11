import { Wrap } from "@chakra-ui/react";

import CardAudiosList from "../../components/CardAudiosList";

function GameAudio() {
  return (
    <Wrap
      w={'100%'}
      display={'flex'}
      pb={['170px']}
      backgroundColor='#0A0A0B'
      justify={'center'}
      justifyContent={'center'}
    >
      <CardAudiosList />
    </Wrap>
  )
}

export default GameAudio;
