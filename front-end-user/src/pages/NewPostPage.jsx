import { Field, Textarea, Input, Button, Box, Stack, StackSeparator, FieldRoot, FieldLabel, EditableTextarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewPostPage() {
    const navigate = useNavigate();

    async function submitPost(e) {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;

        try { 
            await axios.post("http://localhost:3000/api/posts", {
            title: title,
            content: content
            }, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
            }});
            navigate("/home", {state: {message: "New post added!"}})
        } catch(err) {
            console.log(err);
            navigate("/home", {state: {message: "Dang, couldn't add your post this time. Try again later."}})
        }
    }

    return (
        <section>
            <Box p={6}>
                <form onSubmit={submitPost}>
                <Field.Root>
                    <FieldLabel autoFocus="true">Post title</FieldLabel>
                    <Input id="title" name="title"></Input>
                    <FieldLabel>Post content</FieldLabel>
                    <Textarea id="content" size="xl" height="50vh" placeholder="Your post..."></Textarea>
                    <Button type="submit">Submit</Button>
                </Field.Root>
                </form>
            </Box>
        </section>
    )
}