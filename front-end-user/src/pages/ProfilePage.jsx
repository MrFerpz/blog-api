import { Box, Flex, Table, Stack, Heading, TableBody } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState("")
    const token = localStorage.token;

    useEffect(() => {
        getUserDetails();
    },[])

    async function getUserDetails() {

        try {
            const user = await axios.get("http://localhost:3000/api/profile", 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                        }
                }
            );
            const userData = user.data.data;
            console.log(userData);
            setUserInfo(userData);

        } catch(err) {
            console.log(err)
        }
    }
    
    // had many problems around it trying to load before it had finished getting the details
    // important to have a loading state so it knows what to render in the meantime
    if (!userInfo || !userInfo.payload) {
        return <div>Loading...</div>;
    }

    return (
        <Flex flexDirection="column" justifyContent="center">
            <Box p={6}>
                <Stack>
                    <Heading marginBottom="10px">Your details</Heading>
                </Stack>
                <Table.Root size="md">
                    <TableBody>
                        <Table.Row>
                            <Table.Cell>Username</Table.Cell>
                            <Table.Cell>{userInfo?.payload.username}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>User ID</Table.Cell>
                            <Table.Cell>{userInfo?.payload.id}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Account created at</Table.Cell>
                            <Table.Cell>{userInfo?.payload.created_at}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Admin status</Table.Cell>
                            <Table.Cell>{userInfo?.payload.isAdmin.toString()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Author status</Table.Cell>
                            <Table.Cell>{userInfo?.payload.isAuthor.toString()}</Table.Cell>
                        </Table.Row>
                    </TableBody>
                </Table.Root>
            </Box>
        </Flex>
    )
}
