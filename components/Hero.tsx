'use client'

import * as React from 'react';
import { Flex, Avatar, Box, Container } from '@chakra-ui/react';
import { MotionBox, MotionFlex } from './motion';
import Header from './header';

const ANIMATION_DURATION = 0.5;

const IntroSection = () => {
  const color = 'blue.400';

  return (
    <Container maxW="5xl" p={{ base: 5, md: 12 }}>
      <Flex direction={['column', 'column', 'row']}>
        <MotionBox
          opacity="0"
          initial={{
            translateX: -150,
            opacity: 0
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              duration: ANIMATION_DURATION
            }
          }}
          m="auto"
          mb={[16, 16, 'auto']}
        >
          <MotionBox whileHover={{ scale: 1.2 }} rounded="full" shadow="lg">
            <Avatar
              size="2xl"
              showBorder={true}
              borderColor={color}
              src={'bond.jpg'}
            />
          </MotionBox>
        </MotionBox>
        <MotionFlex
          position="relative"
          ml={['auto', 'auto', 16]}
          m={['auto', 'initial']}
          w={['90%', '85%', '80%']}
          maxW="800px"
          opacity="0"
          justifyContent="center"
          alignItems="flex-start"
          direction="column"
          initial={{
            opacity: 0,
            translateX: 150
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              duration: ANIMATION_DURATION
            }
          }}
        >
          <Box position="relative">
            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
              <Header underlineColor={color} mt={0} cursor="pointer" width="max-content">
                Welcome!
              </Header>
            </MotionBox>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
            My name is{' '}
            <Box as="strong" fontWeight="600">
              Bond.
            </Box>{' '}
            James Bond. I'm an{' '}
            <Box as="span" whiteSpace="nowrap">
              aspiring voice actor and
            </Box>{' '}
            <Box as="span" whiteSpace="nowrap">
              secret agent&nbsp;
            </Box>
            from{' '}
            <Box as="span" whiteSpace="nowrap">
              Richmond, VA.
            </Box>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
            This is my portfolio, where I exhibit my talent and the things I'm working on.
          </Box>
        </MotionFlex>
      </Flex>
    </Container>
  );
};

export default IntroSection;