import { Text } from "@chakra-ui/react";

function TextMaxChamp({ numberHits, maxChampions }) {
  return (
    <Text color='#c4b998' fontSize='16px' fontWeight='bold' textTransform='uppercase' letterSpacing='2px'>{numberHits} / {maxChampions}</Text>
  );
}

export default TextMaxChamp;
