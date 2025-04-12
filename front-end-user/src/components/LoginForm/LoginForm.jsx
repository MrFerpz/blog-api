import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Box, Stack, Text, Center, Field, Input, Button, Separator, Flex } from "@chakra-ui/react"
import { PasswordInput } from "../ui/password-input"


function LoginForm(message) {
    // for navigating back to home after login
    const navigate = useNavigate()

    async function loginPost (e) {
        e.preventDefault();

        // take from the inputs
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
    
        try {
            const {data} = await axios.post("http://localhost:3000/api/login", {
                    username: username,
                    password: password
                    }, {
                    headers: {
                    'Content-Type': 'application/json'
                    }});
                
                console.log(data);
                localStorage.setItem("token", data.data);
                console.log(localStorage)

            } catch(err) {
                console.log(err);
                navigate("/login");
            }
            navigate("/posts");
    }

    return (
        <Center>
            <Box bg="blackAlpha.700" variant="surface" borderRadius="md" boxShadow="sm" p={4}>
                <Stack>
                    <Text>Login below</Text>
                </Stack>
                <Stack h="10px"></Stack>
                <Separator></Separator>
                <Stack h="10px"></Stack>
                <form onSubmit={loginPost}>
                    <Field.Root>
                        <Field.Label>Username</Field.Label>
                        <Input id="username" p="10px" flex="1"></Input>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput id="password" flex="1"></PasswordInput>
                    </Field.Root>
                    <Stack h="10px"></Stack>
                    <Flex justifyContent="center">
                   <Button type="submit">Log in</Button>
                   </Flex>
                </form>
            </Box>
        </Center>
    )
}


export default LoginForm