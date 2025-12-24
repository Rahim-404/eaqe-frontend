import { Routes, Route,Navigate } from "react-router-dom"
import { Navbar } from "./Components/navbar"
import { Footer } from "./Components/footer"
import HomePage from "./Containers/Home/Home"
import AboutPage from "./Containers/About/About"
import ServicesPage from "./Containers/Services/Services"
import ContactPage from "./Containers/Contact/Contact"
import LoginPage from "./Containers/Login/Login"
import SignupPage from "./Containers/SignUp/SignUp"
import AdminPage from "./Containers/Admin/Admin"
import { useState } from "react"

function App() {
  const [isAuth,setIsAuth] = useState(true)
  const [isAdmin,setIsAdmin] = useState(true)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          {
            <Route path="/admin/*" element={isAdmin ? <AdminPage/> :<Navigate to="/login"/>} />
          }
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
