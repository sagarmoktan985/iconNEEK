import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// Hash the password so it is not stored as plain text (still demo-level security only)
const hashPassword = async (text) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

const getUsers = () => JSON.parse(localStorage.getItem('users')) || []

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')))

  const register = async (formData) => {
    const users = getUsers()
    const email = formData.email.trim().toLowerCase()

    if (users.find((u) => u.email === email)) {
      return { ok: false, message: 'An account with this email already exists.' }
    }

    const { confirmPassword, password, ...rest } = formData
    users.push({ ...rest, email, id: Date.now(), password: await hashPassword(password) })
    localStorage.setItem('users', JSON.stringify(users))
    return { ok: true }
  }

  const login = async (email, password) => {
    const found = getUsers().find((u) => u.email === email.trim().toLowerCase())
    if (!found || found.password !== (await hashPassword(password))) {
      return { ok: false, message: 'Invalid email or password.' }
    }
    const session = { id: found.id, fullname: found.fullname, email: found.email }
    localStorage.setItem('currentUser', JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}