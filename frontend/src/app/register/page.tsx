"use client"

import RegisterForm from '@/components/auth/RegisterFrom'
import React, { useState } from 'react'
import { SubmitNewUser } from './actions'

export default function page() {
  const [formUserData, setFormUserData] = useState([
    {
      email: "",
      password: "",
      username: ""
    }
  ])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormUserData((prevState) => {
      return prevState.map((item) => {
        return { ...item, [name]: value }
      })
    })
    console.log(e.target.value)
    return formUserData
  }

  const handleSubmit = async () => {
    try {
      const { username, email, password } = formUserData[0]
      const res = await SubmitNewUser(username, email, password)

      if (res?.status === 201) {
        console.log("User created")
      } 
    }catch (error) {
      console.error("Error in handleSubmit: ", error)
    }  

  }

  return (
    <RegisterForm formUserData={formUserData} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}
