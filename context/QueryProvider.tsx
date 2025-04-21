'use client'

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify';

interface QueryProviderProps {
    children: ReactNode
}

const queryClient = new QueryClient ()

export function QueryProvider({children}: QueryProviderProps) {

    return (
        <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
        </QueryClientProvider>
    )
}