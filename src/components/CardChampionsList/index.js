import { useEffect, useState, useRef } from "react";

import CardChampion from "../CardChampion";
import championsSummary from "../../services/championsSummary";
import { Wrap } from "@chakra-ui/react";
import ModalFind from "../ModalFind";

function ChampionsCardList({ setLoading, startGame, maxCounter, showChampion, setGameOver, restartGame, setRestartGame, setStartGame, setFinalCounter, setFinalMessage , gameOver, setFinalTitle}) {
  const [champions, setChampions] = useState({});
  const [maxChampions, setMaxChampions] = useState(0);
  const [numberHits, setNumberHits] = useState(0);
  const [changeShowChamp, setChangeShowChamp] = useState(false);
  const refChamp = useRef(null);

  useEffect(() => {
    if (maxChampions === 0 || changeShowChamp !== showChampion) {
      handlerGetChampionsSummary(showChampion);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setChangeShowChamp(showChampion);
    }

    if(restartGame) {
      handlerGetChampionsSummary(showChampion);
      setNumberHits(0);
      setGameOver({ success: false, fail: false });
      setRestartGame(false);
      setStartGame(false);
    }

    if(numberHits === maxChampions && startGame && !restartGame) {
      setGameOver({ success: true, fail: false });
      setStartGame(false);
    }

    if(gameOver.fail && startGame && !restartGame) {
      setGameOver({ success: false, fail: true });
      setFinalMessage(`Você acertou ${numberHits} de ${maxChampions} campeões.`);
      setFinalTitle('Fora de Micão hein posição!');
    }
  }, [maxChampions, champions, setLoading, showChampion, changeShowChamp, restartGame, setGameOver, setRestartGame, setStartGame, numberHits, maxCounter, gameOver.fail, setFinalMessage, setFinalTitle, startGame]);

  const handlerGetChampionsSummary = async (showChamp) => {
    try {
      const response = await championsSummary.get();
      delete response.data[0];
      for (const key in response.data) {
        response.data[key] = { ...response.data[key], showChamp: showChamp, hit: false };
      }

      let newResponse = response.data;

      let currentIndex = newResponse.length, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newResponse[currentIndex], newResponse[randomIndex]] = [
          newResponse[randomIndex], newResponse[currentIndex]];
      }

      newResponse = newResponse.filter(function (element) {
        return element !== undefined;
      });

      setChampions(newResponse);
      setMaxChampions(Object.keys(response.data).length);
    } catch (err) {
      console.log('ERROR API: ', err);
    }
  };

  return (
    <Wrap
      w={'100%'}
      pt={['16px', '50px']}
      pb={['170px']}
      paddingX={['4px', '20px']}
      justify='center'
      spacing={['16px', '24px']}
      backgroundColor='transparent'
      p={8}
    >
      {
        Object.entries(champions).map(([key, value]) => (
          <CardChampion key={key} {...value} refChamp={refChamp} keyValue={key} />
        ))
      }
      {
        startGame &&
        <ModalFind
          maxChampions={maxChampions}
          numberHits={numberHits}
          champions={champions}
          setChampions={setChampions}
          setNumberHits={setNumberHits}
          maxCounter={maxCounter}
          refChamp={refChamp}
          setGameOver={setGameOver}
          setFinalCounter={setFinalCounter}
        />
      }

    </Wrap>
  );
}

export default ChampionsCardList;
