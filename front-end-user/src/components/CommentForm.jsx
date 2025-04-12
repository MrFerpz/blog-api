import { Field, Button, Input, StackSeparator, Stack, Textarea, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";

export default function CommentForm() {
    const navigate = useNavigate();
    const params = useParams();
    const postID = params.postID;
    const [comment, setComment] = useState("")

    function handleInputChange(e) {
        setComment(e.target.value);
        console.log(comment);
    }

    async function submitComment(e) {
        // stop it from submitting straight away
        e.preventDefault();

        // post request
        await axios.post(`http://localhost:3000/api/posts/${postID}`, 
        {
            content: comment,
        }, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.token,
            }
        })

        // reset form
        setComment("")
        // refresh page
        navigate(0);
    }

    return (
        <Stack width="75vw">
                <form onSubmit={submitComment}>
                <Field.Root>
                    <Field.Label>Your comment</Field.Label>
                    <Textarea 
                    name="comment" 
                    size="xl"
                    id="newcomment"
                    value={comment}
                    onChange={handleInputChange}
                    />
                </Field.Root>
                <StackSeparator h="10px"></StackSeparator>
                <Flex justifyContent="center"><Button marginBottom="30px" type="submit">Submit</Button></Flex>
                </form>
        </Stack>
    )
}