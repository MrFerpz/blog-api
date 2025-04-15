import axios from "axios"
import { useState, useEffect } from "react"
import { Flex, Table, Button, TableBody, StackSeparator } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function AdminUsersPage() {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        getUsers();
    },[])

    useEffect(() => {
        getUsers();
    },[usersList])

    async function getUsers() {
    try {
        const users = await axios.get("http://localhost:3000/api/admin/users", {
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.token
        }});
        console.log(users.data);
        setUsersList(users.data);

    } catch(err) {
        console.log(err)
    }}

    if (usersList.length < 1) {
        return (
            <div>Loading...</div>
        )
    }

    async function deleteUser(id) {
        await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});

        getUsers();
    }

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
            <Table.Root size="md">
                <TableBody>
                    <Table.Row>
                        <Table.ColumnHeader>User ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Username</Table.ColumnHeader>
                        <Table.ColumnHeader>Account created at</Table.ColumnHeader>
                        <Table.ColumnHeader>Author status</Table.ColumnHeader>
                        <Table.ColumnHeader>Admin status</Table.ColumnHeader>
                        <Table.ColumnHeader>Delete</Table.ColumnHeader>
                    </Table.Row>
                    {usersList.map(user => 
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.created_at}</Table.Cell>
                            <Table.Cell>{user.isAuthor.toString()}</Table.Cell>
                            <Table.Cell>{user.isAdmin.toString()}</Table.Cell>
                            <Table.Cell><Button id={user.id} onClick={(e) => deleteUser(user.id)} color="white" bg="red.800">Delete User</Button></Table.Cell>
                        </Table.Row>
                    )}
                </TableBody>
            </Table.Root>
            <StackSeparator h="20px"></StackSeparator>
            <Link to="/"><Button>Go back</Button></Link>
        </Flex>
    )
}