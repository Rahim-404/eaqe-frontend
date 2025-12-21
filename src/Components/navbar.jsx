"use client"

import { Link, useNavigate } from "react-router-dom"
import { Menu, LogOut, User, Languages, X } from "lucide-react"
import { useState, useEffect } from "react"
//import { getCurrentUser, signOut } from "../lib/auth-store"
import { getTranslation, getStoredLanguage, setStoredLanguage } from "../lib/i18n"
import { motion, AnimatePresence } from "motion/react"

export function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [lang, setLang] = useState("fr")
  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    //setUser(getCurrentUser())
    const storedLang = getStoredLanguage()
    setLang(storedLang)
    document.documentElement.setAttribute("lang", storedLang)
    document.documentElement.setAttribute("dir", storedLang === "ar" ? "rtl" : "ltr")
  }, [])

  const handleLogout = () => {
    //signOut()
    setUser(null)
    navigate("/")
  }

  const handleLanguageChange = (newLang) => {
    setLang(newLang)
    setStoredLanguage(newLang)
    document.documentElement.setAttribute("lang", newLang)
    document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr")
    setShowLangMenu(false)
    window.location.reload()
  }

  const t = (key) => getTranslation(lang, key)

  const languages = [
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-600 backdrop-blur-sm border-b border-red-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">EAQE</span>
            </div>
            <span className="font-semibold text-lg hidden md:block text-white">
              {lang === "ar" ? "الجودة الجزائرية" : lang === "en" ? "Algerian Quality" : "Qualité Algérienne"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-white hover:text-white/80 transition-colors font-medium">
              {t("home")}
            </Link>
            <Link to="/services" className="text-sm text-white hover:text-white/80 transition-colors font-medium">
              {t("services")}
            </Link>
            <Link to="/about" className="text-sm text-white hover:text-white/80 transition-colors font-medium">
              {t("about")}
            </Link>
            <Link to="/contact" className="text-sm text-white hover:text-white/80 transition-colors font-medium">
              {t("contact")}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">{languages.find((l) => l.code === lang)?.label}</span>
              </button>

              <AnimatePresence>
                {showLangMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-50"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md transition-colors ${
                            lang === language.code ? "bg-red-50 font-semibold text-red-600" : "text-gray-700"
                          }`}
                        >
                          {language.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full">
                  <User className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">{user.name}</span>
                </div>
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  {t("admin")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-white text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-white text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-2 overflow-hidden"
            >
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-white hover:text-white/80"
              >
                {t("home")}
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-white hover:text-white/80"
              >
                {t("services")}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-white hover:text-white/80"
              >
                {t("about")}
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-white hover:text-white/80"
              >
                {t("contact")}
              </Link>

              <div className="py-2 space-y-2">
                <div className="text-xs text-white/60 uppercase tracking-wide">{t("language")}</div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      handleLanguageChange(language.code)
                      setIsOpen(false)
                    }}
                    className={`block w-full text-left py-2 text-sm transition-colors ${
                      lang === language.code ? "text-white font-semibold" : "text-white/80"
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>

              {user ? (
                <div className="space-y-2 pt-2 border-t border-white/20">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md">
                    <User className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">{user.name}</span>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-white/90 transition-colors text-center"
                  >
                    {t("admin")}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-2 border-2 border-white text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-white/20">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 border-2 border-white text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-center"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-white/90 transition-colors text-center"
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
