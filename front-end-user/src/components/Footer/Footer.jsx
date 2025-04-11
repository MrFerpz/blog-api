import { Box, Flex, HStack, Text } from '@chakra-ui/react';

function Footer() {
    return (
        <Box bgColor="blue.900" position="absolute" bottom="0" left="0" right="0" px={6} py={4}>
            <Flex align="center" justify="space-between">
                <Text>Thanks for visiting.</Text>
                <Text>Contact us at:</Text>
                <Text>Social links:</Text>
            </Flex>
        </Box>
    )
}

export default Footer