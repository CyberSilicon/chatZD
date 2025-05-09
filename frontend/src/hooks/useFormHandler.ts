import { useState } from 'react'

interface FormData {
  [key: string]: string
}

export const useFormHandler = (initialState: FormData) => {
  const [formUserData, setFormUserData] = useState<FormData>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormUserData(prev => ({ ...prev, [name]: value }))
  }

  return {
    formUserData,
    handleChange,
    setFormUserData
  }
}
