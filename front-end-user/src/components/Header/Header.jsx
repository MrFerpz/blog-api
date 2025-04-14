import { Box, Flex, Heading, HStack, Button } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  
  function logOut() {
    localStorage.clear();
    navigate("/home", {state: {message: "Successfully logged out."}});
  }

  return (
    <Box bg="blue.900" color="white" px={6} py={4} shadow="sm">
      <Flex align="center" justify="space-between">
        <Heading size="2xl">Devpreneurs</Heading>
        <HStack spacing={4}>
          <Link to="/"><Button size="lg" variant="solid" colorPalette="blue">Home</Button></Link>
          <Link to="/posts"><Button size="lg"variant="solid" colorPalette="blue">Posts</Button></Link>
          <Link to="/profile"><Button size="lg" variant="solid" colorPalette="blue">Profile</Button></Link>
          {localStorage.token ?
          <Button onClick={logOut} size="lg" variant="solid" colorPalette="blue">Log out</Button> 
          : // if not logged in show log-out button
          <Link to="/login"><Button size="lg" variant="solid" colorPalette="blue">Log in</Button></Link>
          }
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
