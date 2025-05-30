// components/SessionMonitor.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { getSessions } from '../api/helper'

interface Session {
  sessionId: string
  userId: string
  ipAddress: string
  deviceInfo: string
  lastActiveAt: string
  createdAt: string
}

interface Ended {
  session: Session
  endedAt: Date
}

export default function HomeContainer() {
  const [activeSessions, setActiveSessions] = useState<Session[]>([])
  const [endedSessions, setEndedSessions] = useState<Ended[]>([])
  const prevSessionsRef = useRef<Session[]>([])

  // Calcule la différence en minutes
  const diffMinutes = (from: Date, to = new Date()) =>
    Math.floor((to.getTime() - from.getTime()) / 60000)

  // Charge et compare
  const poll = async () => {
    try {
      const data = await getSessions()
      const latest: Session[] = data.sessions || []

      // Détecte les sessions qui ont disparu depuis la dernière fois
      const prev = prevSessionsRef.current
      const ended = prev.filter(
        ps => !latest.find(ls => ls.sessionId === ps.sessionId)
      )
      if (ended.length) {
        // Pour chacune, on stocke le moment où elle a disparu
        const now = new Date()
        setEndedSessions(es => [
          ...es,
          ...ended.map(s => ({ session: s, endedAt: now })),
        ])
      }

      // Sauvegarde pour la prochaine comparaison
      prevSessionsRef.current = latest
      setActiveSessions(latest)
    } catch (err: any) {
      toast.error(err.message || 'Erreur récupération sessions')
    }
  }

  // Polling au montage et toutes les 30s
  useEffect(() => {
    poll()
    const id = setInterval(poll, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Sessions actives</h2>
        {activeSessions.length === 0 && <p>Aucune session active.</p>}
        <ul>
          {activeSessions.map(s => {
            const mins = diffMinutes(new Date(s.lastActiveAt))
            return (
              <li key={s.sessionId} className="mb-2">
                <p><strong>Appareil :</strong> {s.deviceInfo}</p>
                <p><strong>IP :</strong> {s.ipAddress}</p>
                <p>
                  <strong>Dernière activité :</strong>{' '}
                  {mins <= 1 ? 'à l’instant' : `il y a ${mins} min`}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Sessions déconnectées</h2>
        {endedSessions.length === 0 && <p>Aucune session déconnectée récemment.</p>}
        <ul>
          {endedSessions.map(({ session, endedAt }) => {
            const mins = diffMinutes(endedAt)
            return (
              <li key={session.sessionId} className="mb-2 text-gray-600">
                <p><strong>Appareil :</strong> {session.deviceInfo}</p>
                <p><strong>IP :</strong> {session.ipAddress}</p>
                <p>
                  <strong>Déconnecté :</strong>{' '}
                  {mins <= 1 ? 'à l’instant' : `il y a ${mins} min`}
                </p>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
