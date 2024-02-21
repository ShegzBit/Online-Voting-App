"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const updateUser = (newUser) => {
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>

    )
}

export const useUser = () => useContext(UserContext);