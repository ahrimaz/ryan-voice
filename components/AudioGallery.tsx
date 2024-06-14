'use client'

import { Box, Button, VStack, Heading, Text, Progress, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionButton = motion(Button); 

const AudioGallery = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const response = await fetch('/audioFiles.json');
      const data = await response.json();
      setAudioFiles(data);
    };

    fetchAudioFiles();
  }, []);

  useEffect(() => {
    if (currentAudio) {
      audioRef.current = new Audio(currentAudio.url);
      audioRef.current.play();
      setIsPlaying(true);

      const updateProgress = () => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);

      return () => {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.pause();
      };
    }
  }, [currentAudio]);

  const handlePlayPause = (audio) => {
    if (currentAudio && currentAudio.url === audio.url) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentAudio(audio);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <MotionBox
          ref={ref}
          as="section"
          p={8}
          bg="gray.100"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {audioFiles.length > 0 && (
            <Heading as="h2" size="xl" mb={4} textAlign="center">
              Listen to My Work
            </Heading>
          )}
          <VStack spacing={4} align="center">
            {audioFiles.map((audio) => (
              <Box key={audio.id} p={4} bg="white" borderRadius="md" boxShadow="md" width="80%" maxW="500px">
                <HStack justifyContent="space-between">
                  <Text>{audio.title}</Text>
                  <MotionButton onClick={() => handlePlayPause(audio)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {currentAudio && currentAudio.url === audio.url && isPlaying ? <FaPause /> : <FaPlay />}
                  </MotionButton>
                </HStack>
                {currentAudio && currentAudio.url === audio.url && (
                  <Box mt={2}>
                    <Progress value={progress} size="sm" colorScheme="blue" />
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </MotionBox>
      )}
    </InView>
  );
};

export default AudioGallery;

