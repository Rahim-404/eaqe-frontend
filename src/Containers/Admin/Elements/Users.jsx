"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, X } from "lucide-react"

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, nameFr: "Admin User", email: "admin@example.com", role: "Administrateur", status: "Actif" },
    { id: 2, nameFr: "Editor User", email: "editor@example.com", role: "Éditeur", status: "Actif" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ nameFr: "", email: "", role: "Utilisateur", status: "Actif" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...editingUser, ...formData } : u)))
    } else {
      setUsers([...users, { id: Date.now(), ...formData }])
    }
    closeModal()
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({ nameFr: user.nameFr, email: user.email, role: user.role, status: user.status })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    /*
    if (confirm("Êtes-vous sûr ?")) {
      setUsers(users.filter((u) => u.id !== id))
    }*/
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({ nameFr: "", email: "", role: "Utilisateur", status: "Actif" })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Utilisateurs</h2>
          <p className="text-gray-600">Gérez les utilisateurs du système</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rôle</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{user.nameFr}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      title="Modifier"
                      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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
                {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.nameFr}
                    onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  >
                    <option>Administrateur</option>
                    <option>Éditeur</option>
                    <option>Utilisateur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  >
                    <option>Actif</option>
                    <option>Inactif</option>
                  </select>
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
                  {editingUser ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
