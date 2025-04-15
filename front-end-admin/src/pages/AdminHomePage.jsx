import { Flex, Button, Text, Box, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import AdminLoginForm from "../components/AdminLoginForm"

export default function AdminHomePage() {

    console.log(localStorage)

    const positionStyle = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh)"
    }

    if (localStorage.token)
    return  (
            <Flex height="100vh" justifyContent="center" gap="50px" alignItems="center">
                <Link to="/admin/users"><Button _hover={{bg: 'blue.300', scale: "1.02"}} fontWeight="bolder" fontSize="1.2rem" p={12} bg="whiteAlpha.900">Users</Button></Link>
                <Link to="/admin/posts"><Button _hover={{bg: 'blue.300', scale: "1.02"}} fontWeight="bolder" fontSize="1.2rem" p={12} bg="whiteAlpha.900">Posts</Button></Link>
            </Flex>
            )

    return (
        <section>
            <div style={positionStyle}>
                <AdminLoginForm/>
            </div>
        </section>
    )
}