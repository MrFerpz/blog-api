import { Box, Heading, Flex } from "@chakra-ui/react";

export default function Header() {
    return (
        <Box position="absolute" top="0" left="0" right="0" height="100px" bg="blue.900" colorPalette="blue">
            <Flex height="100%" justifyContent="center" alignItems="center">
             <Heading fontSize="1.5rem">Admin Dashboard</Heading>
            </Flex>
        </Box>
    )
}