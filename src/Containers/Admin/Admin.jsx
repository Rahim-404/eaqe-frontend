"use client"

import { useState, useEffect } from "react"
import { useNavigate,useLocation,Routes,Route,Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, LogOut, Folder, FileText, User,Users, File } from "lucide-react"
import ServicesPage from "./Elements/Services"
import CategoriesPage from "./Elements/Categories"
import QuotesPage from "./Elements/Quates"
import PersonalInfoPage from "./Elements/Personal"
import UsersPage from "./Elements/Users"

export default function AdminPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  

  const getCurrentPage = () => {
    const path = location.pathname
    if (path.includes("/admin/services")) return "services"
    if (path.includes("/admin/categories")) return "categories"
    if (path.includes("/admin/quotes")) return "quotes"
    if (path.includes("/admin/personal-info")) return "personal-info"
    if (path.includes("/admin/users")) return "users"
    return "services"
  }

  const [currentPage,setCurrentPage] = useState(getCurrentPage())

  useEffect(() => {
    const user = true
    if (!user) {
      navigate("/login")
      return
    }
  }, [navigate])

  const handleChangePage = (element) =>
  {
    navigate(`/admin/${element}`)
    setCurrentPage(element)
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex mt-12">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-white text-gray-900 transition-all duration-300 overflow-hidden border-r border-gray-200`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Administration</h2>
          <p className="text-sm text-gray-500 mt-1">Qualité Certification</p>
        </div>

        <nav className="p-6 space-y-2">
          <NavItem
            icon={<File className="h-5 w-5" />}
            label="Services"
            active={currentPage === "services"}
            onClick={() => handleChangePage("services")}
          />
          <NavItem
            icon={<Folder className="h-5 w-5" />}
            label="Catégories"
            active={currentPage === "categories"}
            onClick={() =>handleChangePage("categories")}
          />
          <NavItem
            icon={<FileText className="h-5 w-5" />}
            label="Devis"
            active={currentPage === "quotes"}
            onClick={() => handleChangePage("quotes")}
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="Utilisateurs"
            active={currentPage === "users"}
            onClick={() =>handleChangePage("users")}
          />
          <NavItem
            icon={<User className="h-5 w-5" />}
            label="Informations"
            active={currentPage === "personal-info"}
            onClick={() => handleChangePage("personal-info")}
          />
        </nav>

        <div className="p-6 border-t border-gray-200 mt-auto">
          <button className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
          <Routes>
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/personal-info" element={<PersonalInfoPage />} />
            <Route path="/" element={<Navigate to="/admin/services"/>}/>
          </Routes>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-red-50 text-red-600 font-medium "
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
