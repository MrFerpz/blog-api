import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";



function Footer() {
    return (
        <Box bgColor="blue.900" position="absolute" bottom="0" left="0" right="0" px={6} py={4}>
            <Flex align="center" justify="space-between">
                <Text>Thanks for visiting.</Text>
                <Text>All rights reserved.</Text>
                <Flex gap={3}>
                    <FaFacebook size="2rem" />
                    <FaInstagram size="2rem"/>
                    <FaTwitter size="2rem"/>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Footer