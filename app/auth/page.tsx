"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/utils/fetcher'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()

    const onSignIn = async () => {
        if (!email || !username || !password) {
            setShowAlert(true)
            return
        }
        setShowAlert(false)
        setLoading(true)
        setErr("")
        try {
            // Use the fetcher utility for the sign-in request
            await fetcher('signIn', 'POST', { email, password });
            router.push('/');
        } catch (error) {
            console.error(error);
            setErr("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    const onSignUp = async () => {
        if (!email || !username || !password) {
            setShowAlert(true)
            return
        }
        setShowAlert(false)
        setLoading(true)
        setErr("")
        try {
            await fetcher('signUp', 'POST', { email, password, username });
            router.push('/');
        } catch (err) {
            console.error(err);
            setErr("Failed to sign up, please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/31297026/pexels-photo-31297026/free-photo-of-peaceful-sunset-over-ohrid-lake-and-snowy-mountains.jpeg?auto=compress&cs=tinysrgb&w=1200')",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
            className='flex justify-center items-center flex-1 min-h-screen'
        >
            <div className="sm:w-[425px] w-full h-auto p-4 rounded-lg bg-white flex flex-col items-center mx-4">
                {showAlert && (
                    <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                            </svg>
                            <span className="sr-only">Warning icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Fill in missing fields.</div>
                        <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={() => setShowAlert(false)} // Close the alert
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )}
                <h1 className='text-2xl font-semibold text-black mb-1'>
                    Welcome back
                </h1>
                <p className='text-gray-600'>Enter your credentials</p>
                {err && (
                    <div className='text-red-500 text-sm mt-4'>
                        {err}
                    </div>
                )}
                <div className='flex-1 grid grid-flow-row gap-4 w-full mt-10'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="email" className='text-sm text-gray-600'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                            type='email'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="username" className='text-sm text-gray-600'>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id='username'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            disabled={loading}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="password" className='text-sm text-gray-600'>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id='password'
                            type='password'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            disabled={loading}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            type='button'
                            onClick={onSignUp}
                            disabled={loading}
                            className='bg-gray-300 text-black rounded-md py-1.5 flex-1'
                        >
                            {loading ? 'Processing...' : 'Sign up'}
                        </button>
                        <button
                            type='button'
                            onClick={onSignIn}
                            disabled={loading}
                            className='bg-blue-600 text-white rounded-md py-1.5 flex-1'
                        >
                            {loading ? 'Processing...' : 'Log in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
