'use client'

import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  getChats,
  createChat,
  updateChatTitle,
  addParticipant,
  removeParticipant,
  deleteChat,
  Chat,
} from '../api/chat'

export default function ChatManager() {
  // ─── États ─────────────────────────────────────────────
  const [chats, setChats] = useState<Chat[]>([])   // toujours un tableau
  const [loading, setLoading] = useState<boolean>(true)

  // Formulaire création
  const [type, setType] = useState<'private' | 'group' | 'channel'>('private')
  const [title, setTitle] = useState<string>('')
  const [participants, setParticipants] = useState<string>('')

  // ─── Chargement initial et rechargement ────────────────
  const loadChats = async () => {
    setLoading(true)
    try {
      const list = await getChats()
      setChats(Array.isArray(list) ? list : [])
    } catch (err: any) {
      toast.error(err.message || 'Erreur chargement chats')
      setChats([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChats()
  }, [])

  // ─── Handlers ───────────────────────────────────────────

  // Création de chat
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newChat = await createChat({
        type,
        title: type === 'private' ? undefined : title.trim() || undefined,
        participants: participants
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })
      setChats((cur) => [newChat, ...cur])
      toast.success('Chat créé')
      setTitle('')
      setParticipants('')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Mise à jour du titre
  const handleUpdateTitle = async (chatId: string) => {
    const newTitle = prompt('Nouveau titre du chat ?')
    if (!newTitle) return
    try {
      const updated = await updateChatTitle(chatId, newTitle.trim())
      setChats((cur) => cur.map((c) => (c._id === chatId ? updated : c)))
      toast.success('Titre mis à jour')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Ajout de participant
  const handleAddParticipant = async (chatId: string) => {
    const userId = prompt('ID du participant à ajouter ?')
    if (!userId) return
    try {
      const updated = await addParticipant(chatId, userId.trim())
      setChats((cur) => cur.map((c) => (c._id === chatId ? updated : c)))
      toast.success('Participant ajouté')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Retrait de participant
  const handleRemoveParticipant = async (chatId: string, userId: string) => {
    if (!confirm('Retirer ce participant ?')) return
    try {
      const updated = await removeParticipant(chatId, userId)
      setChats((cur) => cur.map((c) => (c._id === chatId ? updated : c)))
      toast.success('Participant retiré')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // Suppression de chat
  const handleDelete = async (chatId: string) => {
    if (!confirm('Supprimer ce chat ?')) return
    try {
      await deleteChat(chatId)
      setChats((cur) => cur.filter((c) => c._id !== chatId))
      toast.success('Chat supprimé')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // ─── Affichage ─────────────────────────────────────────

  if (loading) {
    return <p className="p-4 text-center">Chargement des chats…</p>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Création */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Créer un chat</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="flex items-center space-x-2">
            <label>Type :</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="border p-1 rounded"
            >
              <option value="private">Privé</option>
              <option value="group">Groupe</option>
              <option value="channel">Canal</option>
            </select>
          </div>
          {type !== 'private' && (
            <div>
              <label className="block mb-1">Titre :</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Nom du groupe ou canal"
              />
            </div>
          )}
          <div>
            <label className="block mb-1">
              Participants (IDs, séparés par virgules) :
            </label>
            <input
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="id1,id2,…"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Créer
          </button>
        </form>
      </section>

      {/* Liste */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Mes chats</h2>
        {chats.length === 0 ? (
          <p>Aucun chat trouvé.</p>
        ) : (
          <ul className="space-y-6">
            {chats.map((chat) => (
              <li
                key={chat._id}
                className="border p-4 rounded shadow space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>{chat.type.toUpperCase()}</strong>{' '}
                      {chat.title && <span>– {chat.title}</span>}
                    </p>
                    <p className="text-sm text-gray-600">
                      Créé le{' '}
                      {new Date(chat.createdAt).toLocaleDateString()}{' '}
                      à {new Date(chat.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(chat._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateTitle(chat._id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Modifier titre
                  </button>
                  <button
                    onClick={() => handleAddParticipant(chat._id)}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Ajouter participant
                  </button>
                </div>

                <div>
                  <p className="font-medium">Participants :</p>
                  <ul className="flex flex-wrap gap-2">
                    {Array.isArray(chat.participants) &&
                      chat.participants.map((uid) => (
                        <li
                          key={uid}
                          className="px-2 py-1 bg-gray-200 rounded flex items-center space-x-2"
                        >
                          <span className="text-sm">{uid}</span>
                          <button
                            onClick={() =>
                              handleRemoveParticipant(chat._id, uid)
                            }
                            className="text-red-600 text-xs"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
