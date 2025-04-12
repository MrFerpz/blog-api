import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Grid, GridItem, Flex, Heading, HStack, Button, Separator } from '@chakra-ui/react';
import { Link } from "react-router-dom"

function HomePage() {
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState(localStorage.token);

    async function postsGet() {
        const postsList = await axios.get("http://localhost:3000/api/posts",
            {
                headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
                }
            });
            const postsData = postsList.data
            setPosts(postsData)
        }

    useEffect(() => {
        postsGet()
            }
    ,[])

    return (
        <section>
            <Grid templateColumns="repeat(3, 1fr)" gap="6">
                {posts.map(post => 
                    <Link to={`/posts/${post.id}`}>
                        <GridItem backgroundColor="blackAlpha.800" key={post.id} p={10} variant="surface" borderRadius="md">
                            <Text>{post.title}</Text>
                            <Separator h="20px"></Separator>
                            <Text>{post.content}</Text>
                        </GridItem>
                    </Link>
                )}
            </Grid>
        </section>
    )
}

export default HomePage