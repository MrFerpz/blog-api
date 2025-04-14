import { useParams } from "react-router-dom"
import { Box, Stack, Heading, Text, Grid, Center, Field, Input, Button, Separator, Flex, GridItem, StackSeparator } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import CommentForm from "../components/CommentForm";
import axios from "axios";

function PostPage() {
    let params = useParams();
    const postID = params.postID;
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    function toggleSwitch() {
        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    useEffect(() => {
        getPost(postID);
    },[])

    async function getPost(postID) {
        const postItem = await axios.get(`http://localhost:3000/api/posts/${postID}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.token,
                "Content-Type": "application/json"
            }})

            setPost(postItem.data);
            setComments(postItem.data.Comments)
            console.log(postItem.data);
            console.log(postItem.data.Comments)
}

return (
    <div>
        <Box shadow="md" p={6} bg="blackAlpha.900">
            <Stack p={3}><Heading>{post.title}</Heading></Stack>
            <Stack marginLeft="12px"><Text fontSize="x-small">{post.created_at}</Text></Stack>
            <Stack p={3}>{post.content}</Stack>
            <Separator h="20px"></Separator>
            <Stack>Comments</Stack>
            <Stack>
                {comments.map(comment => {
                        return <Grid bg="gray.800" borderRadius="md" p={8} key={comment.id} gridTemplateColumns="1fr 9fr">
                                    <Grid gap={2} gridTemplateRows="1fr 1fr">
                                        <GridItem><Text><b>Author ID:</b> {comment.authorID}</Text></GridItem>
                                        <GridItem><Text fontSize="0.45rem">{comment.created_at}</Text></GridItem>
                                    </Grid>
                                    <Text textAlign="center">{comment.content}</Text>
                                </Grid>
                })}
            </Stack>
            <Separator></Separator>
            <StackSeparator h="20px"></StackSeparator>
            <Flex width="100%" justifyContent="center">{toggle ? <CommentForm/> : <Button marginBottom="30px" onClick={toggleSwitch}>New Comment</Button>}</Flex>
            <StackSeparator h="20px"></StackSeparator>
        </Box>
    </div>
)}

export default PostPage