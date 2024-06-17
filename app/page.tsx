import { Box } from "@chakra-ui/react";
import WithSubnavigation from "@/components/Navbar";
import IntroSection from "@/components/Hero";
import AudioGallery from "@/components/AudioGallery";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

function Home() {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <WithSubnavigation/>
        <IntroSection/>
        <AudioGallery/>
        <Box flex="1"/>
        <Contact/>
        <Footer/>
    </Box>
  );
}

export default Home;