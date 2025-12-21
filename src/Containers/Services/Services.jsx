"use client"

import { getServices } from "../../lib/services-store"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { getTranslation, getStoredLanguage } from "../../lib/i18n"

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lang, setLang] = useState("fr")
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    setServices(getServices())
    const storedLang = getStoredLanguage()
    setLang(storedLang)
    setIsRTL(storedLang === "ar")
  }, [])

  const t = (key) => getTranslation(lang, key)

  const categories = ["all", ...new Set(services.map((s) => s.category))]
  const filteredServices =
    selectedCategory === "all" ? services : services.filter((s) => s.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative lg:min-h-[50vh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">{t("servicesHeroTitle")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("servicesHeroSubtitle")}</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category === "all" ? t("allCategories") : category}
              </button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {service.category}
                    </span>
                    <span className="text-2xl font-bold text-red-600">{service.price} DA</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.nameFr}</h3>
                  <p className="text-base text-gray-500 mb-2" dir="rtl">
                    {service.nameAr}
                  </p>

                  <p className="text-gray-600 mb-2 leading-relaxed text-sm">{service.descriptionFr}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm" dir="rtl">
                    {service.descriptionAr}
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    {t("requestQuote")}
                    <ArrowRight className={`${isRTL ? "rotate-180" : ""} h-4 w-4`} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-500 text-lg">{t("noServicesFound")}</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
