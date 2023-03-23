import { Text } from "@chakra-ui/react";
import React from "react";

function TextTimer({timer}) {

  return(
    <Text color='#c4b998' fontSize='16px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>{timer}</Text>
  )
}

export default TextTimer;
