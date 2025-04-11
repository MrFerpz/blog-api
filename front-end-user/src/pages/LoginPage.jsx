import LoginForm from "../components/LoginForm/LoginForm"

function LoginPage() {
    const positionStyle = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        height: "calc(100vh - 76px - 56px)"
    }

    return (
        <section>
            <div style={positionStyle}>
                <LoginForm/>
            </div>
        </section>
    )
}

export default LoginPage