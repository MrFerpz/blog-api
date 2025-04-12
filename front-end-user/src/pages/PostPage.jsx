import { useParams } from "react-router-dom"
import { Box, Stack, Heading, Text, Center, Field, Input, Button, Separator, Flex } from "@chakra-ui/react"
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
            <Stack><Text fontSize="x-small">{post.created_at}</Text></Stack>
            <Stack p={3}>{post.content}</Stack>
            <Separator h="20px"></Separator>
            <Stack>Comments</Stack>
            <Stack>
                {comments.map(comment => {
                        return <Stack bg="gray.800" borderRadius="md" p={2} key={comment.id}>{comment.content}</Stack>
                })}
            </Stack>
            <Separator></Separator>
            <div>{toggle ? <CommentForm/> : <Button onClick={toggleSwitch}>New Comment</Button>}</div>
        </Box>
    </div>
)}

export default PostPage