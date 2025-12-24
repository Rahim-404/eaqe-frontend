"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, X } from "lucide-react"

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([
    { id: 1, clientFr: "Client 1", clientAr: "عميل 1", serviceFr: "Service A", serviceAr: "الخدمة أ", amount: "5000" },
    { id: 2, clientFr: "Client 2", clientAr: "عميل 2", serviceFr: "Service B", serviceAr: "الخدمة ب", amount: "8000" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState(null)
  const [formData, setFormData] = useState({ clientFr: "", clientAr: "", serviceFr: "", serviceAr: "", amount: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingQuote) {
      setQuotes(quotes.map((q) => (q.id === editingQuote.id ? { ...editingQuote, ...formData } : q)))
    } else {
      setQuotes([...quotes, { id: Date.now(), ...formData }])
    }
    closeModal()
  }

  const handleEdit = (quote) => {
    setEditingQuote(quote)
    setFormData({
      clientFr: quote.clientFr,
      clientAr: quote.clientAr,
      serviceFr: quote.serviceFr,
      serviceAr: quote.serviceAr,
      amount: quote.amount,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    /*
    if (confirm("Êtes-vous sûr ?")) {
      setQuotes(quotes.filter((q) => q.id !== id))
    }*/
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingQuote(null)
    setFormData({ clientFr: "", clientAr: "", serviceFr: "", serviceAr: "", amount: "" })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Devis</h2>
          <p className="text-gray-600">Gérez les devis des clients</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Ajouter un devis
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Montant</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <motion.tr
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{quote.clientFr}</div>
                  <div className="text-sm text-gray-500" dir="rtl">
                    {quote.clientAr}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{quote.serviceFr}</div>
                  <div className="text-sm text-gray-500" dir="rtl">
                    {quote.serviceAr}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{quote.amount} DA</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(quote)}
                      title="Modifier"
                      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(quote.id)}
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
                {editingQuote ? "Modifier le devis" : "Ajouter un devis"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client (Français)</label>
                  <input
                    type="text"
                    required
                    value={formData.clientFr}
                    onChange={(e) => setFormData({ ...formData, clientFr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العميل (عربي)</label>
                  <input
                    type="text"
                    required
                    value={formData.clientAr}
                    onChange={(e) => setFormData({ ...formData, clientAr: e.target.value })}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service (Français)</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceFr}
                    onChange={(e) => setFormData({ ...formData, serviceFr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الخدمة (عربي)</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceAr}
                    onChange={(e) => setFormData({ ...formData, serviceAr: e.target.value })}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant (DA)</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
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
                  {editingQuote ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
