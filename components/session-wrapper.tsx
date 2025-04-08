"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface User {
    email: string,
    username: string
}

interface SessionProps {
    user: User | undefined
    handleLogout: () => Promise<void>
}

const SessionContext = createContext<SessionProps | null>(null)

function SessionWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setisLoading] = useState(false)

    const handleLogout = useCallback(async() => {
        try {
           await fetch("https://digital-factory-frontend.vercel.app/signOut",{
             credentials: 'include'
           }) 
           router.push('/auth')
        } catch (error) {
            console.error(error);
        }
    }, [router])

    useEffect(() => {
        const checkAuth = async () => {
            setisLoading(true)
            try {
                // if (pathname.includes('auth')) return
                const res = await fetch('https://digital-factory-frontend.vercel.app/get-user', {
                    credentials: 'include'
                })
                if (res.status === 401) {
                    router.push('/auth')
                    return
                }
                router.push('/')
            
            } catch (error) {
                console.error(error)
                router.push('/auth')
            } finally {
                setisLoading(false)
            }
        }
        checkAuth()
    }, [setUser, router, pathname])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-white text-black text-2xl">
                Loading...
            </div>
        )
    }

    return (
        <SessionContext value={{
            user,
            handleLogout
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