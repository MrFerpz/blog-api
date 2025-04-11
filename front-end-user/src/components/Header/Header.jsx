import { Box, Flex, Heading, HStack, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="blue.900" color="white" px={6} py={4} shadow="sm">
      <Flex align="center" justify="space-between">
        <Heading size="2xl">Devpreneurs</Heading>
        <HStack spacing={4}>
          <Button size="lg" variant="solid" colorPalette="blue">Home</Button>
          <Button size="lg"variant="solid" colorPalette="blue">Profile</Button>
          <Button size="lg" variant="solid" colorPalette="blue">Log Out</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
