"use client"
import React from 'react'
import LoginForm from '@/components/auth/LoginForm'
import { useFormHandler } from '@/hooks/useFormHandler'
import toast from 'react-hot-toast'
import { Login } from '@/api/helper'
import { useRouter } from 'next/navigation'

export default function page( ) {
  const router = useRouter();

  const { formUserData, handleChange } = useFormHandler({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      const { email, password } = formUserData
      const res = await Login(email, password)
      router.push('/');
      toast.success(res.message)
      return res;
    }catch (error: any) {
      toast.error(error.message)
    }  

  }

  return (
    <LoginForm formUserData={formUserData} handleChange={handleChange} handleLogin={handleLogin}/>
  )
}
