"use client"

import React from 'react'
import LoginForm from '@/components/auth/LoginForm'
import { LoginUser } from './actions'
import { useFormHandler } from '@/hooks/useFormHandler'


export default function page( ) {

  const { formUserData, handleChange } = useFormHandler({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      const { email, password } = formUserData
      const res = await LoginUser(email, password)
      return res;      
    }catch (error: any) {
      console.error("Failed to login: ", error.message)
    }  

  }

  return (
    <LoginForm formUserData={formUserData} handleChange={handleChange} handleLogin={handleLogin}/>
  )
}
