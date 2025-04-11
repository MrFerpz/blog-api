import styles from "./LoginForm.module.css"
import axios from "axios"

function LoginForm() {

    async function loginPost (e) {
        e.preventDefault();

        // take from the inputs
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
     
     const {data} = await axios.post("http://localhost:3000/api/login", {
            username: username,
            password: password
            }, {
            headers: {
            'Content-Type': 'application/json'
            }
            
        })
        // set the token in localStorage
        localStorage.setItem({token: data.data})
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={loginPost} id="loginform" action="/login">
                <label htmlFor="username">Username</label>
                <input id="username" name="username"></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password"></input>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}


export default LoginForm