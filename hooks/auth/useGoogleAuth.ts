import { googleAuth } from '@/services/login.services'
import { useQuery } from '@tanstack/react-query'

export const useGoogleAuth = () => {

    return useQuery({
        queryKey:['googleAuth'],
        queryFn: googleAuth,
    })
}
