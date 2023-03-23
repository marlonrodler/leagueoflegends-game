import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text } from "@chakra-ui/react";
import React from "react";

function PopoverMode({ handleStartGame, mode, buttonModeColor, buttonModeTitle, textHelp, textExample }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          colorScheme={buttonModeColor}
          w={'90px'}
        >
          {buttonModeTitle}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          border='1px solid #927345'
          backgroundColor={'rgba(10,10,12,.9)'}
        >
          <PopoverArrow
            backgroundColor={'#927345'}
            shadow={'-1px -1px 1px 0 #927345'}
          />
          <PopoverHeader
            borderBottom={'1px solid #927345'}
          >
            <Text
              fontSize='16px'
              fontWeight='bold'
              textTransform='uppercase'
              letterSpacing='2px'
              color={'#c4b998'}
            >
              Como jogar:
            </Text>
          </PopoverHeader>
          <PopoverCloseButton
            color={'#c4b998'}
          />
          <PopoverBody
            border='none'
          >
            <Text
              fontSize='16px'
              fontWeight='bold'
              letterSpacing='2px'
              color={'#c4b998'}
            >
              {textHelp}
              <br/>
              {textExample}
            </Text>
          </PopoverBody>
          <PopoverFooter
            border='none'
            display={'flex'}
            justifyContent={'end'}
          >
            <Button
              onClick={() => handleStartGame(mode)}
              colorScheme={buttonModeColor}
              w={'90px'}
            >
              Começar
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default PopoverMode;
