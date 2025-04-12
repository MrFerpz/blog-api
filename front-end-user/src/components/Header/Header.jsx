import { Box, Flex, Heading, HStack, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <Box bg="blue.900" color="white" px={6} py={4} shadow="sm">
      <Flex align="center" justify="space-between">
        <Heading size="2xl">Devpreneurs</Heading>
        <HStack spacing={4}>
          <Link to="/"><Button size="lg" variant="solid" colorPalette="blue">Home</Button></Link>
          <Link to="/posts"><Button size="lg"variant="solid" colorPalette="blue">Posts</Button></Link>
          <Button size="lg" variant="solid" colorPalette="blue">Profile</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
