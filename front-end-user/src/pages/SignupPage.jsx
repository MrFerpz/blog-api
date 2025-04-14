import SignupForm from "../components/SignupForm/SignupForm"

function SignupPage() {
    const positionStyle = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        height: "calc(100vh - 76px - 56px)"
    }

    return (
        <section>
            <div style={positionStyle}>
                <SignupForm/>
            </div>
        </section>
    )
}

export default SignupPage