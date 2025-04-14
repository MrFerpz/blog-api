import { Flex, Button, Box, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function AdminHomePage() {
    return  (
            <Flex height="100vh" justifyContent="center" gap="50px" alignItems="center">
                <Button _hover={{bg: 'blue.300', scale: "1.02"}} fontWeight="bolder" fontSize="1.2rem" p={12} bg="whiteAlpha.900"><Link to="/admin/users">Users</Link></Button>
                <Button _hover={{bg: 'blue.300', scale: "1.02"}} fontWeight="bolder" fontSize="1.2rem" p={12} bg="whiteAlpha.900"><Link to="/admin/posts">Posts</Link></Button>
                <Button _hover={{bg: 'blue.300', scale: "1.02"}} fontWeight="bolder" fontSize="1.2rem" p={12} bg="whiteAlpha.900"><Link to="/admin/comments">Comments</Link></Button>
            </Flex>
            )
}