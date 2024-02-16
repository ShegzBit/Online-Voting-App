"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './userContext'
import { getElections } from '@/lib/electionHelper'


const ElectionContext = createContext()

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
        <ElectionContext.Provider value={{elections, updateElections}}>
            {children}
        </ElectionContext.Provider>
    )

}

export const useElection = () => useContext(ElectionContext);