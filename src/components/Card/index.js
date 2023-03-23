import React from 'react';
import { Box, Text, WrapItem } from '@chakra-ui/react';
import questionImg from '../../assets/imgs/question-invert.png';

function Card({ active, urlImgLoading, hit, difficulty, name, region, apiName, refChamp }) {
  return (
    <WrapItem
      ref={(champ) => { refChamp[apiName] = champ }}
      margin='0'
      transition='all 0.5s ease'
      _hover={{ transform: ['', 'scale(1.1)'] }}
    >
      <Box
        backgroundPosition='center'
        backgroundImage={active ? urlImgLoading : questionImg}
        backgroundColor={active ? 'transparent' : '#2A2A2A'}
        backgroundRepeat='no-repeat'
        backgroundSize={active ? 'cover' : '200px'}
        display='flex'
        flexDirection='column-reverse'
        w={['140px', '200px']}
        h={['392px', '452px']}
        margin='8px'
        borderRadius='lg'
        overflow='hidden'
        border={active ? '' : '1px solid #927345'}
        transition={active ? 'transform 0.6s' : ''}
        transform={active ? 'rotateY(0deg)' : 'rotateY(180deg)'}
        _hover={{ border: '1px solid #927345' }}
      >
        <Box p='4'
          backgroundColor='rgba(10,10,12,.9)'
          borderTop='1px solid #927345'
          display={!hit && difficulty === 'yuumi' ? 'none' : (active ? '' : 'none')}
        >
          <Box
            color='#937341'
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
            textTransform='uppercase'
            textAlign='center'
            letterSpacing='2px'
          >
            {name}
          </Box>
          <Box display='flex' justifyContent='center'>
            <Text color='#c4b998'>{region}</Text>
          </Box>
        </Box>
      </Box>
    </WrapItem>
  )
}

export default Card;
