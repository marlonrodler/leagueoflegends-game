import { useState } from "react";
import './index.css';
import { Input } from "@chakra-ui/react";

function InputFind({ champions, setChampions, numberHits, setNumberHits, refChamp }) {

  const [inputValue, setInputValue] = useState('');

  const handleFindChampions = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const fixInputValue = inputValue.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '');
    const newChampions = { ...champions };

    e.target.classList.remove('error');
    e.target.classList.remove('success');

    Object.keys(newChampions).forEach(key => {
      if(newChampions[key] !== undefined) {
        const fixName = newChampions[key].name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '');
        if (fixName.toLowerCase() === fixInputValue.toLowerCase() && !newChampions[key].hit) {
          newChampions[key].hit = true;
          newChampions[key].showChamp = true;
          setNumberHits(numberHits + 1);
          setInputValue('');
          setTimeout(() => refChamp[key].scrollIntoView({ behavior: 'smooth' }), 0);
          e.target.classList.add('success');
        } else {
          e.target.classList.add('error');
        }
      }
    });

    setChampions(newChampions);
  }

  return (
    <Input
      autoFocus
      textTransform={'uppercase'}
      placeholder='Encontre um campeão'
      color={'#c4b998'}
      _placeholder={{ opacity: 1, color: 'rgb(147, 115, 65, 0.6)' }}
      onChange={(e) => handleFindChampions(e)}
      value={inputValue}
    />
  )
}

export default InputFind;
