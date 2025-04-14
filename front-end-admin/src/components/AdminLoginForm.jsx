import axios from "axios";
import { Field } from "@chakra-ui/react";
import { PasswordInput } from "../../../front-end-user/src/components/ui/password-input";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
    const navigate = useNavigate();

    async function adminLogin() {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        try {
            const data = await axios.post("http://localhost:3000/api/admin/login", {
                    username: username,
                    password: password
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('token', data.data);
            navigate("/admin/home")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={adminLogin}>
            <Field.Root>
                <Field.Label for="username">Username</Field.Label>
                <Input id="username"></Input>
                <Field.Label for="password">Password</Field.Label>
                <PasswordInput id="password"></PasswordInput>
                <Button type="submit">Log in</Button>
            </Field.Root>
        </form>
    )
}