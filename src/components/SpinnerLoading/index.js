import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Box
      position={'fixed'}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      top={'-12px'}
      zIndex={999}
      w='100vw'
      h='100vh'
      backgroundColor={'rgba(10,10,12,.9)'}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  );
}

export default Loading;
