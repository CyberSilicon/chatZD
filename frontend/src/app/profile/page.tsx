"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logout } from '@/api/helper';
import toast from 'react-hot-toast';
export default function ProfilePage({ user }: any) {
  const router = useRouter();

  // Placeholder user data if none provided
  const mockUser = {
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Passionate developer and tech enthusiast.',
    avatarUrl: '/images/avatar.png',
    posts: 120,
    followers: 3450,
    following: 180,
  };

  const profile = user || mockUser;

  const handleLogout = async () => {
    try {
      await Logout()
      router.push('/login')
      toast.success('Déconnexion réussie')
    } catch (err: any) {
      toast.error(err.message || 'Erreur déconnexion')
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name} avatar`}
              layout="fill"
              className="rounded-full"
            />
          </div>
          <h1 className="text-2xl text-black font-semibold">{profile.name}</h1>
          <p className="text-gray-500 mb-2">@{profile.username}</p>
          <p className="text-center text-gray-700 mb-6">{profile.bio}</p>

          <div className="flex justify-between w-full mb-6">
            <div className="text-center">
              <span className="block text-lg font-medium">{profile.posts}</span>
              <span className="text-gray-500">Posts</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-medium">{profile.followers}</span>
              <span className="text-gray-500">Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-medium">{profile.following}</span>
              <span className="text-gray-500">Following</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
