"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "motion/react"
import { LogIn } from "lucide-react"
import { getTranslation, getStoredLanguage } from "../../lib/i18n"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    setLoading(true)

    const result = true // Todo : result 

    if (result.success) {
      navigate("/admin")
      window.location.reload()
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="bg-gray-50 pt-24 pb-16">
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
                <LogIn className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">{t("loginTitle")}</h1>
            <p className="text-center text-gray-600 mb-8">{t("loginSubtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("signingIn") : t("signIn")}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              {t("noAccount")}{" "}
              <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                {t("createAccount")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
