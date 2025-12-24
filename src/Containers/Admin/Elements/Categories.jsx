"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, X } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, nameFr: "Logistique", nameAr: "اللوجستيات", description: "Services de logistique" },
    { id: 2, nameFr: "Transport", nameAr: "النقل", description: "Services de transport" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ nameFr: "", nameAr: "", description: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...editingCategory, ...formData } : c)))
    } else {
      setCategories([...categories, { id: Date.now(), ...formData }])
    }
    closeModal()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({ nameFr: category.nameFr, nameAr: category.nameAr, description: category.description })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    /*
    if (confirm("Êtes-vous sûr ?")) {
      setCategories(categories.filter((c) => c.id !== id))
    }*/
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData({ nameFr: "", nameAr: "", description: "" })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Catégories</h2>
          <p className="text-gray-600">Gérez les catégories de services</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Ajouter une catégorie
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Catégorie</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{category.nameFr}</div>
                  <div className="text-sm text-gray-500" dir="rtl">
                    {category.nameAr}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(category)}
                      title="Modifier"
                      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      title="Supprimer"
                      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom (Français)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameFr}
                    onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم (عربي)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none resize-none"
                />
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
                  {editingCategory ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
