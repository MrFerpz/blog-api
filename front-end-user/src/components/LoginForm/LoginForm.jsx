import { styles } from "./LoginForm.module.css"

function LoginForm() {
    return (
        <div className={styles.formContainer}>
            <form method="post" action="/login">
                <label for="username">Username</label>
                <input name="username"></input>
                <label for="password">Password</label>
                <input name="password"></input>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm