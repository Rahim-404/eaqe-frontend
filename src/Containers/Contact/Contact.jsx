import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getTranslation, getStoredLanguage } from "../../lib/i18n"

export default function ContactPage() {
  const [lang, setLang] = useState("fr")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setLang(getStoredLanguage())
  }, [])

  const t = (key) => getTranslation(lang, key)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      lang === "ar"
        ? "شكراً لرسالتك! سنرد عليك قريباً."
        : lang === "en"
          ? "Thank you for your message! We will respond shortly."
          : "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.",
    )
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white pt-32 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2),transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("contactTitle")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("contactSubtitle")}</p>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fullName")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("fullName")}
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
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("phone")}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+213"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("company")}
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t("company")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("subject")}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("subject")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("message")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
                  >
                    {t("sendMessage")}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("email")}</h3>
                    <p className="text-gray-600 text-sm">contact@eaqe.dz</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("phoneLabel")}</h3>
                    <p className="text-gray-600 text-sm">+213 671 82 02 52</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("addressLabel")}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t("businessCenter")}
                      <br />
                      {t("algeriaLocation")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-600 text-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{t("openingHours")}</h3>
                    <div className="space-y-1 text-sm">
                      <p>{t("sundayToThursday")}</p>
                      <p>{t("fridaySaturday")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
