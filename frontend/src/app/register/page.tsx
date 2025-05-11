// File: app/register/page.tsx
"use client";

import React from 'react';
import RegisterForm from '@/components/auth/RegisterFrom';
import { useFormHandler } from '@/hooks/useFormHandler';
import { Register } from '@/api/helper';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { formUserData, handleChange } = useFormHandler({
    email: '',
    username: '',
    password: ''
  });

  const handleSubmit = async () => {
    try {
      const { username, email, password } = formUserData;
      const res = await Register(username, email, password);
      toast.success(res.message || 'User created!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Unknown error.');
    }
  };
  return (
    <RegisterForm
      formUserData={formUserData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
