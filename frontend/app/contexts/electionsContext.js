"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './userContext'
import { getElections } from '@/lib/electionHelper'


const ElectionsContext = createContext()

export const ElectionsProvider = ({ children }) => {
    const [elections, setElections] = useState()
    const { user } = useUser()

    useEffect(() => {
        const getAllElections = async () => {
            try {
                if (user?.id) {
                    const res = await getElections(user?.id)
                    if (res) {
                        setElections(res)
                    }
                }

            } catch (e) {
                console.log(e)
            }

        }

        getAllElections()
    }, [])

    const updateElections = (elections) => {
        setElections(elections)
    }

    return (
        <ElectionsContext.Provider value={{elections, updateElections}}>
            {children}
        </ElectionsContext.Provider>
    )

}

export const useElections = () => useContext(ElectionsContext);