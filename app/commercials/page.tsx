import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import WithSubnavigation from "@/components/Navbar";
import AudioGallery from "@/components/AudioGallery";

const Commercials = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <WithSubnavigation/>
      <AudioGallery jsonFile="/audioFiles.json"/>
    </Box>
  );
};

export default Commercials;