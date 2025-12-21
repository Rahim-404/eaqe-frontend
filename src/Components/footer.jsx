"use client"

import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { getTranslation, getStoredLanguage } from "../lib/i18n"

export function Footer() {
  const [lang, setLang] = useState("fr")

  useEffect(() => {
    setLang(getStoredLanguage())
  }, [])

  const t = (key) => getTranslation(lang, key)

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footerTitle")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t("footerDescription")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("servicesFooter")}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{t("qualityCertification")}</li>
              <li>{t("complianceAudit")}</li>
              <li>{t("professionalTraining")}</li>
              <li>{t("strategicConsultation")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footerContact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>contact@eaqe.dz</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>+213 671 82 02 52</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{t("algeriaLocation")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>{t("footerRights")}</p>
        </div>
      </div>
    </footer>
  )
}
