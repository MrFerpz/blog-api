import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Grid, GridItem, Flex, Heading, HStack, Button, Skeleton, Separator, StackSeparator } from '@chakra-ui/react';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import LoginPage from "./LoginPage";

function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState(localStorage.token);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    async function postsGet() {
        const postsList = await axios.get("http://localhost:3000/api/posts",
            {
                headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
                }
            });
            const postsData = postsList.data
            setPosts(postsData);
            setIsLoaded(true);
        }

    useEffect(() => {
        postsGet()
            }
    ,[])

    if (localStorage.token) {
    return (
        <section>
            <StackSeparator h="20px"></StackSeparator>
            <Box p={10}>
            <Grid templateColumns="repeat(3, 1fr)" gap="6">
                {isLoaded ? (
                posts.map(post => 
                    <Link key={post.id} to={`/posts/${post.id}`}>
                        <GridItem _hover={{bg: "blue.800", transform: "scale(1.02)"}} backgroundColor="blackAlpha.800" p={7} variant="surface" borderRadius="md">
                            <Text fontWeight="bold" fontSize="xl">{post.title}</Text>
                            <Separator h="15px"></Separator>
                            <Text>{post.content}</Text>
                        </GridItem>
                    </Link>
                    )) : [1, 2, 3, 4, 5, 6].map((index) => (
                        <GridItem key={index}>
                          <Skeleton bg="blue.950" height="125px"/>
                        </GridItem>
                      ))};
            </Grid>
            </Box>
        </section>
    )}

    else {
                <Flex height="80%" width="100%" flexDirection="column" justifyContent="center" alignItems="center">
                    <Text marginBottom="10px">{message}</Text>
                    <Box bg="blackAlpha.950" p={8} borderRadius="md">
                        <Text>It looks like you're not logged in...</Text>
                        <Link to="/login"><Text fontSize="xl" color="blue.300">Click here to login.</Text></Link>
                    </Box>
                </Flex>
    }
}

export default HomePage