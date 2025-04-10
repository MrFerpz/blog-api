import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../components/Header/Header"
import LoginForm from "../components/LoginForm/LoginForm";
import Footer from "../components/Footer/Footer"

const message = axios.get("http://localhost:3000");

function App() {
    return (
        <section>
            <Header/>
            <LoginForm/>
            <Footer/>
            <div>{message}</div>
        </section>
    )
}

export default App