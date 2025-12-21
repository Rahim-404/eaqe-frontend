import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Plus, Edit, Trash2, X } from "lucide-react"
//import { getCurrentUser } from "../lib/auth-store"
import { getServices, addService, updateService, deleteService } from "../../lib/services-store"

export default function AdminPage() {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: "",
    nameFr: "",
    category: "",
    price: "",
    descriptionAr: "",
    descriptionFr: "",
  })

  useEffect(() => {
    const user = true // Todo : result
    if (!user) {
      navigate("/login")
      return
    }
    setServices(getServices())
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingService) {
      updateService(editingService.id, formData)
    } else {
      addService(formData)
    }

    setServices(getServices())
    closeModal()
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      nameAr: service.nameAr,
      nameFr: service.nameFr,
      category: service.category,
      price: service.price,
      descriptionAr: service.descriptionAr || "",
      descriptionFr: service.descriptionFr || "",
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    /*
    if (confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      deleteService(id)
      setServices(getServices())
    }*/
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingService(null)
    setFormData({
      nameAr: "",
      nameFr: "",
      category: "",
      price: "",
      descriptionAr: "",
      descriptionFr: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Gérer les services</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Ajouter un service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  {service.category}
                </span>
                <span className="text-xl font-bold text-red-600">{service.price} DA</span>
              </div>

              <h3 className="text-lg font-semibold mb-1 text-gray-900">{service.nameFr}</h3>
              <p className="text-sm text-gray-500 mb-3" dir="rtl">
                {service.nameAr}
              </p>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.descriptionFr}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2" dir="rtl">
                {service.descriptionAr}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingService ? "Modifier le service" : "Ajouter un service"}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prix (DA)</label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Français)</label>
                  <textarea
                    rows={3}
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (عربي)</label>
                  <textarea
                    rows={3}
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    dir="rtl"
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
                    {editingService ? "Mettre à jour" : "Ajouter"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
