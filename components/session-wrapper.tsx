"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";

interface User {
    email: string,
    username: string
}

interface SessionProps {
    user: User | undefined
}

const SessionContext = createContext<SessionProps | null>(null)

function SessionWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            
                await fetch('http://localhost:4444/get-user', {
                    credentials: 'include'
                })
                    .then(res => {
                        if (res.status !== 200) {
                            router.push('/auth')
                            return
                        }
                        return res.json()
                    })
                    .then(data => {
                        setUser(data)
                    })    
        }
        checkAuth()
    }, [setUser, router])
    return (
        <SessionContext value={{
            user,

        }}>
            
            {children}
        </SessionContext>
    )
}

function useSession() {
    const context = useContext(SessionContext);
    if (context === null) {
        throw new Error()
    }
    return context
}

export { useSession, SessionWrapper }