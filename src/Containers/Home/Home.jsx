import { ArrowRight, CheckCircle, Users, Award, Building2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { getTranslation, getStoredLanguage } from "../../lib/i18n"

export default function HomePage() {
  const [lang, setLang] = useState("fr")
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const storedLang = getStoredLanguage()
    setLang(storedLang)
    setIsRTL(storedLang === "ar")
  }, [])

  const t = (key) => getTranslation(lang, key)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative lg:min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-balance">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
              >
                {t("discoverServices")}
                <ArrowRight className={`${isRTL ? "rotate-180" : ""} h-5 w-5`} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                {t("contactUs")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("signatureTitle")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("signatureSubtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, count: t("expertsCount"), label: t("expertsLabel"), delay: 0 },
              { icon: Award, count: t("certificationsCount"), label: t("certificationsLabel"), delay: 0.1 },
              { icon: Building2, count: t("companiesCount"), label: t("companiesLabel"), delay: 0.2 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.count}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("mainServicesTitle")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{t("mainServicesSubtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("isoCertification"), description: t("isoCertificationDesc"), icon: Award },
              { title: t("qualityAudit"), description: t("qualityAuditDesc"), icon: CheckCircle },
              { title: t("training"), description: t("trainingDesc"), icon: Users },
              { title: t("consultation"), description: t("consultationDesc"), icon: Building2 },
              { title: t("riskAssessment"), description: t("riskAssessmentDesc"), icon: CheckCircle },
              { title: t("processManagement"), description: t("processManagementDesc"), icon: Award },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <service.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              {t("viewAllServices")}
              <ArrowRight className={`${isRTL ? "rotate-180" : ""} h-5 w-5`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            {t("faqTitle")}
          </motion.h2>

          <div className="space-y-4">
            {[
              { question: t("faqQuestion1"), answer: t("faqAnswer1") },
              { question: t("faqQuestion2"), answer: t("faqAnswer2") },
              { question: t("faqQuestion3"), answer: t("faqAnswer3") },
              { question: t("faqQuestion4"), answer: t("faqAnswer4") },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold mb-2 text-gray-900">{faq.question}</div>
                <div className="text-gray-600 leading-relaxed">{faq.answer}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
