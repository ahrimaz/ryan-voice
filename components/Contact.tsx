'use client'

import { Button, Text, Box } from "@chakra-ui/react";

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = "mailto:rgood@gmail.com";
    };

    return (
        <Box bg="gray.100" p={5} borderRadius="md" shadow="md" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="xl" mb={4} color="blue.700">
                Ready to work with me?
            </Text>
            <Button colorScheme="blue" onClick={handleEmailClick}>
                Contact Me
            </Button>
        </Box>
    );
};

export default Contact;