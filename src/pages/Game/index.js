import React, { useState, useEffect } from 'react'
import api from '../../services/api';

import { Box, Wrap, WrapItem, Text } from '@chakra-ui/react'
import './styles.css';

function Game() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    getChampions();
  });

  const getChampions = async (name) => {
    try {
      const response = await api.get();
      setChampions(response.data);
    } catch (error) {
      console.log('error:', error);
    }
  }

  return (
    <Wrap
      paddingY={['4px', '50px']}
      paddingX={['4px', '20px']}
      justify='center'
      spacing={['8px', '16px', '24px']}
      backgroundColor='#0A0A0B'
    >
      {
        Object.entries(champions).map(([key, value]) => {
          return (
            <WrapItem key={key} transition='all 0.5s ease' _hover={{ transform: 'scale(1.1)' }}>
              <Box
                backgroundSize='cover'
                backgroundPosition='center'
                backgroundImage={value.urlImgLoading}
                display='flex'
                flexDirection='column-reverse'
                w={['306px', '200px']}
                h={['558px', '452px']}
                borderRadius='lg'
                overflow='hidden'
                _hover={{border: '1px solid #927345'}}
              >
                <Box p='4'
                  backgroundColor='rgba(10,10,12,.9)'
                  borderTop='1px solid #927345'
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
                    {value.name}
                  </Box>
                  <Box display='flex' justifyContent='center'>
                    <Text color='#c4b998'>{value.region}</Text>
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          )
        })
      }
    </Wrap>
  )
}

export default Game;
