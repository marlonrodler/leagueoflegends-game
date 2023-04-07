import { CardFooter, Text, Card, WrapItem } from '@chakra-ui/react';
import questionImg from '../../assets/imgs/question-invert.png';

function CardChampion({ showChamp, name, alias, hit, refChamp, keyValue }) {

  const champImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${alias}_0.jpg`;

  return (
    <WrapItem
      justifyContent={'space-between'}
      m='0'
      transition='all 0.5s ease'
      _hover={(showChamp || hit) ? { transform: ['', 'scale(1.1)'] } : ''}
      ref={(champ) => { refChamp[keyValue] = champ }}
    >
      <Card
        backgroundImage={(showChamp || hit) ? `url(${champImg})` : `url(${questionImg})`}
        backgroundColor={(showChamp || hit) ? 'transparent' : '#2A2A2A'}
        backgroundRepeat='no-repeat'
        backgroundSize={(showChamp || hit) ? 'cover' : '200px'}
        backgroundPosition='center center'
        overflow={'hidden'}
        w={'200px'}
        h={'452px'}
        align='center'
        justifyContent={'end'}
        border={!(showChamp || hit) ? '1px solid rgb(146, 115, 69)' : ''}
        transition={hit ? 'transform 0.6s' : ''}
        transform={(hit || showChamp) ? 'rotateY(0deg)' : 'rotateY(180deg)'}
      >
        <CardFooter
          w={'100%'}
          justifyContent={'center'}
          borderTop={'1px solid rgb(146, 115, 69)'}
          backgroundColor={'rgba(10, 10, 12, 0.9)'}
          display={hit ? 'flex' : 'none'}
          flexDirection={'column'}
        >
          <Text align={'center'} fontSize='xl' color={'rgb(146, 115, 69)'}>{name}</Text>
        </CardFooter>
      </Card>
    </WrapItem>

  )
}

export default CardChampion;
