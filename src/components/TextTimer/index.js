import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

function TextTimer({ maxCounter, setGameOver, setFinalCounter }) {

  const [counter, setCounter] = useState(maxCounter);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const constructTimer = counter > 0 && setInterval(() => {
      setCounter(counter - 1);
      setFinalCounter(counter - 1);
      const minutes = Math.floor((counter - 1) / 60);
      const seconds = (counter - 1) - minutes * 60;

      setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

      if (counter === 1) {
        setGameOver({ success: false, fail: true });
      }
    }, 1000);

    return () => clearInterval(constructTimer);
  }, [setCounter, setTimer, counter, maxCounter, setGameOver, setFinalCounter]);

  return (
    <Text color='#c4b998' fontSize='16px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>{timer}</Text>
  )
}

export default TextTimer;
