import { Input } from "@chakra-ui/react";
import React, {useState} from "react";

function InputFind({ champions, setChampions, numberHits, setNumberHits, refChamp, difficulty }) {

  const [input, setInput] = useState('');

  const handleFindChampions = (name) => {
    setInput(name);
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
          if ((name.toLowerCase()).indexOf(region) !== -1 && (name.toLowerCase()).indexOf(key.toLowerCase() + ' ') !== -1) {
            isHit = true;
          }
        }
      }

      if (isHit) {
        newChampions[key].active = true;
        newChampions[key].hit = true;
        setTimeout(() => refChamp[key].scrollIntoView({ behavior: 'smooth' }), 0);
        setInput('');
        setNumberHits(numberHits + 1);
        setChampions(newChampions);
        return;
      }
    }
  }

  return (
    <Input
      autoFocus
      textTransform={'uppercase'}
      placeholder='Encontre um campeão'
      color={'#c4b998'}
      _placeholder={{ opacity: 1, color: 'rgb(147, 115, 65, 0.6)' }}
      onChange={(e) => handleFindChampions(e.target.value)}
      value={input}
    />
  )
}

export default InputFind;
