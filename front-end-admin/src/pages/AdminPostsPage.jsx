import axios from "axios"
import { useState, useEffect } from "react"
import { Flex, Table, Button, TableBody, StackSeparator, Text, Separator, TableCell } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"

export default function AdminPostsPage() {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        getPosts();
    },[])

    useEffect(() => {
        getPosts();
    },[postsList])

    async function getPosts() {
    try {
        const posts = await axios.get("http://localhost:3000/api/admin/posts", {
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.token
        }});
        console.log(posts.data);
        setPostsList(posts.data);

    } catch(err) {
        console.log(err)
    }}

    if (postsList.length < 1) {
        return (
            <div>Loading...</div>
        )
    }

    async function deletePost(id) {
        await axios.delete(`http://localhost:3000/api/admin/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});
        getPosts();
    }

    async function deleteComment(id) {
        await axios.delete(`http://localhost:3000/api/admin/comments/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.token
            }});
        getPosts();
    }

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Table.Root marginTop="20px" size="md">
                <TableBody>
                    <Table.Row>
                        <Table.ColumnHeader>Post ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Author ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Content</Table.ColumnHeader>
                        <Table.ColumnHeader>Created at</Table.ColumnHeader>
                        <Table.ColumnHeader>Published Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Comments</Table.ColumnHeader>
                        <Table.ColumnHeader>Delete</Table.ColumnHeader>
                    </Table.Row>
                    {postsList.map(post => 
                        <Table.Row key={post.id}>
                            <Table.Cell>{post.id}</Table.Cell>
                            <Table.Cell>{post.authorID}</Table.Cell>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>{post.content}</Table.Cell>
                            <Table.Cell>{post.created_at}</Table.Cell>
                            <Table.Cell>{post.isPublished.toString()}</Table.Cell>
                            <Table.Cell>
                                { (post.Comments.length > 1) ? 
                                <Table.Body>
                                <Table.Row>
                                    <Table.ColumnHeader>Comment ID</Table.ColumnHeader>
                                    <Table.ColumnHeader>Comment</Table.ColumnHeader>
                                    <Table.ColumnHeader>Delete<br></br>Comment</Table.ColumnHeader>
                                </Table.Row>
                                {post.Comments.map(comment => 
                                    <Table.Row>
                                            <Table.Cell>
                                            {comment.id}
                                            </Table.Cell>
                                            <TableCell>
                                            {comment.content}
                                            </TableCell>
                                            <Table.Cell>
                                                <Button size="xs" bg="transparent" color="red.700" id={comment.id} onClick={(e) => deleteComment(comment.id)}>Delete</Button>
                                            </Table.Cell>
                                    </Table.Row>
                                        )} 
                                    </Table.Body>
                                    : 
                                    <Text color="whiteAlpha.700">No comments</Text>
                                }
                            </Table.Cell>
                            <Table.Cell><Button id={post.id} onClick={(e) => deletePost(post.id)} color="white" bg="red.800">Delete Post</Button></Table.Cell>
                        </Table.Row>
                    )}
                </TableBody>
            </Table.Root>
            <StackSeparator h="20px"></StackSeparator>
            <Link to="/"><Button marginBottom="30px" marginTop="30px">Go back</Button></Link>
        </Flex>
    )
}