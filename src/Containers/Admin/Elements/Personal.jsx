"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, X } from "lucide-react"

export default function PersonalInfoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nameFr: "Entreprise ABC",
    nameAr: "شركة ABC",
    emailFr: "contact@abc.com",
    emailAr: "البريد الإلكتروني",
    phoneFr: "+213 123 456 789",
    phoneAr: "الهاتف",
    addressFr: "123 Rue de la Paix, Alger",
    addressAr: "123 طريق السلام، الجزائر",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations Personnelles</h2>
          <p className="text-gray-600">Gérez les informations de votre entreprise</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          title="Modifier"
        >
          <Edit className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Français</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Nom de l'entreprise</label>
              <p className="text-gray-900 font-medium">{formData.nameFr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="text-gray-900 font-medium">{formData.emailFr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Téléphone</label>
              <p className="text-gray-900 font-medium">{formData.phoneFr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Adresse</label>
              <p className="text-gray-900 font-medium">{formData.addressFr}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">العربية</h3>
          <div className="space-y-4" dir="rtl">
            <div>
              <label className="text-sm text-gray-600">اسم الشركة</label>
              <p className="text-gray-900 font-medium">{formData.nameAr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">البريد الإلكتروني</label>
              <p className="text-gray-900 font-medium">{formData.emailAr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">الهاتف</label>
              <p className="text-gray-900 font-medium">{formData.phoneAr}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">العنوان</label>
              <p className="text-gray-900 font-medium">{formData.addressAr}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Modifier les informations</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Français</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                    <input
                      type="text"
                      value={formData.nameFr}
                      onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.emailFr}
                      onChange={(e) => setFormData({ ...formData, emailFr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phoneFr}
                      onChange={(e) => setFormData({ ...formData, phoneFr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    <input
                      type="text"
                      value={formData.addressFr}
                      onChange={(e) => setFormData({ ...formData, addressFr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">العربية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.emailAr}
                      onChange={(e) => setFormData({ ...formData, emailAr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
                    <input
                      type="tel"
                      value={formData.phoneAr}
                      onChange={(e) => setFormData({ ...formData, phoneAr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                    <input
                      type="text"
                      value={formData.addressAr}
                      onChange={(e) => setFormData({ ...formData, addressAr: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
