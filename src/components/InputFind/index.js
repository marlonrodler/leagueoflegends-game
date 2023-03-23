import { Input } from "@chakra-ui/react";
import React from "react";

function InputFind({ handleFindChampions, inputChampValue }) {
  return (
    <Input
      // ref={refInputChamp}
      autoFocus
      textTransform={'uppercase'}
      placeholder='Encontre um campeão'
      color={'#c4b998'}
      _placeholder={{ opacity: 1, color: 'rgb(147, 115, 65, 0.6)' }}
      onChange={(e) => handleFindChampions(e.target.value)}
      value={inputChampValue}
    />
  )
}

export default InputFind;
