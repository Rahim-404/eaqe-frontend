import { useState, useEffect } from "react"
import { Button } from "../Components/ui/button"
import { Languages } from "lucide-react"
import { getStoredLanguage, setStoredLanguage } from "../lib/i18n"


export function LanguageSwitcher({ onLanguageChange }) {
  const [currentLang, setCurrentLang] = useState("fr")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCurrentLang(getStoredLanguage())
  }, [])

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang)
    setStoredLanguage(lang)
    onLanguageChange(lang)
    setIsOpen(false)
  }

  const languages = [
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
  ]

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{languages.find((l) => l.code === currentLang)?.label}</span>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md ${
                  currentLang === lang.code ? "bg-gray-50 font-semibold" : ""
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
