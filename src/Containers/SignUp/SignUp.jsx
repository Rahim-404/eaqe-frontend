"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "motion/react"
import { UserPlus } from "lucide-react"
import { getTranslation, getStoredLanguage } from "../../lib/i18n"

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState("fr")

  useEffect(() => {
    setLang(getStoredLanguage())
  }, [])

  const t = (key) => getTranslation(lang, key)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError(
        lang === "ar"
          ? "كلمات المرور غير متطابقة"
          : lang === "en"
            ? "Passwords do not match"
            : "Les mots de passe ne correspondent pas",
      )
      return
    }

    if (password.length < 6) {
      setError(
        lang === "ar"
          ? "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل"
          : lang === "en"
            ? "Password must be at least 6 characters"
            : "Le mot de passe doit contenir au moins 6 caractères",
      )
      return
    }

    setLoading(true)

    const result = true // Todo : result

    if (result.success) {
      navigate("/login?message=success")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">{t("signupTitle")}</h1>
            <p className="text-center text-gray-600 mb-8">{t("signupSubtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Mohamed Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")}
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("confirmPassword")}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("registering") : t("register")}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              {t("haveAccount")}{" "}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                {t("login")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
