"use client"

import RegisterForm from '@/components/auth/RegisterFrom'
import React, { useState } from 'react'
import { SubmitNewUser } from './actions'
import { useFormHandler } from '@/hooks/useFormHandler'

export default function page() {
 
  const { formUserData, handleChange } = useFormHandler({
    email: '',
    username: '',
    password: ''
  })

  const handleSubmit = async () => {
    try {
      const { username, email, password } = formUserData
      const res = await SubmitNewUser(username, email, password)
      console.log(res)
      return res;
    }catch (error: any) {
      console.error("Failed to register ", error.message)
    }  

  }

  return (
    <RegisterForm formUserData={formUserData} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}
