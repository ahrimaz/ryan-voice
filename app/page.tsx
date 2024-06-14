import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import WithSubnavigation from "@/components/Navbar";
import IntroSection from "@/components/Hero";
import AudioGallery from "@/components/AudioGallery";
import Footer from "@/components/Footer";

function Home() {
  return (
    <Box display="flex" flexDirection="column" minH="100vh" alignItems="stretch">
      <WithSubnavigation/>
        <IntroSection>
          <Button colorScheme="teal">Click me</Button>
        </IntroSection>
        <AudioGallery/>
        <Box flex="1"/>
        <Footer/>
    </Box>
  );
}

export default Home;