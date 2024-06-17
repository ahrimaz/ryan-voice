'use client'

import { Box, Button, VStack, Heading, Text, Progress, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import React from "react";

interface AudioFile {
  id: string;
  url: string;
  title: string;
}

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface AudioGalleryProps {
  jsonFile: string;
}

const AudioGallery: React.FC<AudioGalleryProps> = ({ jsonFile }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [currentAudio, setCurrentAudio] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const response = await fetch(jsonFile);
      const data = await response.json();
      setAudioFiles(data);
    };

    fetchAudioFiles();
  }, [jsonFile]);

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    if (currentAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleEnded);
      }

      audioRef.current = new Audio(currentAudio.url);
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);

        audioRef.current.addEventListener('timeupdate', updateProgress);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
            audioRef.current.removeEventListener('ended', handleEnded);
            audioRef.current.pause();
          }
        };
      }
    }
  }, [currentAudio]);

  const handlePlayPause = (audio: AudioFile) => {
    if (currentAudio && currentAudio.id === audio.id) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      setCurrentAudio(audio);
    }
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <MotionBox
          ref={ref}
          as="section"
          p={8}
          bg="white"
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
            {audioFiles.map((audio: AudioFile) => (
              <Box key={audio.id} p={4} bg="white" borderWidth={2} borderRadius="md" boxShadow="md" width="80%" maxW="500px">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>{audio.title}</Text>
                  {currentAudio && currentAudio.url === audio.url && (
                    <Progress value={progress} size="sm" colorScheme="blue" width="100%" maxW="300px" />
                  )}
                  <MotionButton onClick={() => handlePlayPause(audio)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {currentAudio && currentAudio.url === audio.url && isPlaying ? <FaPause /> : <FaPlay />}
                  </MotionButton>
                </HStack>
              </Box>
            ))}
          </VStack>
        </MotionBox>
      )}
    </InView>
  );
};

export default AudioGallery;
