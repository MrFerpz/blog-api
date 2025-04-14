import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {

    function logOut() {
        localStorage.clear();
        window.location.reload();
    }
    
    return (
        <Box position="absolute" top="0" left="0" right="0" height="100px" bg="blue.900" colorPalette="blue">
            <Flex height="100%" justifyContent="space-around" alignItems="center">
             <Heading fontSize="1.5rem">Admin Dashboard</Heading>
             <Button onClick={logOut}>Log out</Button>
            </Flex>
        </Box>
    )
}