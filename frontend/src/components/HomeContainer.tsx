"use client"
import React from 'react'
import { Logout } from '../api/helper'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function HomeContainer() {
  const router = useRouter();
  const handleLogout = async () => {
    const result = await Logout();

    if (result.message) {
      console.log(result.message); // ✅ Affiche le message de la réponse
      toast.success(result.message); // ✅ Affiche le toast
      router.push('/login')
    } else {
      toast.error("Erreur de déconnexion");
    }
  };
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <button className='bg-red-500 p-6 rounded-full' type="button" onClick={handleLogout}>bye bye</button>
    </div>
  )
}
