import LoginForm from "../components/LoginForm/LoginForm"
import { useLocation } from "react-router-dom"
import { StackSeparator, Text } from "@chakra-ui/react";

function LoginPage() {
    const location = useLocation();
    const message = location.state?.message;

    const positionStyle = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 76px - 56px)"
    }

    return (
        <section>
            <div style={positionStyle}>
                <Text marginBottom="10px">{message}</Text>
                <LoginForm/>
            </div>
        </section>
    )
}

export default LoginPage