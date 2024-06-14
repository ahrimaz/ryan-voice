'use client'

import { Button, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer'

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = "mailto:rgood@gmail.com";
    };

    return (
        <InView>
          {({ inView, ref }) => (
            <MotionBox
              ref={ref}
              bg="gray.100"
              p={5}
              borderRadius="md"
              shadow="md"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Text fontSize="xl" mb={4} color="blue.700">
                Ready to work with me?
              </Text>
              <MotionButton
                onClick={handleEmailClick}
                colorScheme="blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Contact Me
              </MotionButton>
            </MotionBox>
          )}
        </InView>
      );
    }

export default Contact;