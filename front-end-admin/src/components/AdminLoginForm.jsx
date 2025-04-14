import axios from "axios";
import { Field, Input, Button } from "@chakra-ui/react";
import { PasswordInput } from "../../../front-end-user/src/components/ui/password-input";

export default function AdminLoginForm() {

    async function adminLogin(e) {
        e.preventDefault();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        try {
            const userData = await axios.post("http://localhost:3000/api/admin/login", {
                    username: username,
                    password: password
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(userData.data);

            localStorage.setItem('token', userData.data.data);
            console.log(localStorage);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={adminLogin}>
            <Field.Root>
                <Field.Label htmlFor="username">Username</Field.Label>
                <Input id="username"></Input>
                <Field.Label htmlFor="password">Password</Field.Label>
                <PasswordInput id="password"></PasswordInput>
                <Button type="submit">Log in</Button>
            </Field.Root>
        </form>
    )
}