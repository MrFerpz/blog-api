import AdminHomePage from "./pages/AdminHomePage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminPostsPage from "./pages/AdminPostsPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "./components/ui/provider"

function App() {

    return (
        <BrowserRouter>
            <Provider>
                <Header/>
                    <Routes>
                        <Route path="/" element={<AdminHomePage/>}/>
                        <Route path="/admin/home" element={<AdminHomePage/>}/>
                        <Route path="/admin/users" element={<AdminUsersPage/>}/>
                        <Route path="/admin/posts" element={<AdminPostsPage/>}/>
                        {/* <Route path="/admin/comments" element={<AdminCommentsPage/>}/> */}
                    </Routes>
            </Provider>
        </BrowserRouter>
    )
}

export default App