import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PostPage from './pages/PostPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "../../src/components/ui/provider"

function App() {

    return (
        <BrowserRouter>
            <Provider>
                <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/posts" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/posts/:postID" element={<PostPage/>}/>
                    </Routes>
                <Footer/>
            </Provider>
        </BrowserRouter>
    )
}

export default App