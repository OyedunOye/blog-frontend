import { userLogin } from '@/services/login.services'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useLogUserIn = () => {

    return useMutation({
        mutationFn: userLogin
    })
    // return useQuery({ queryKey: ['loggingIn'], queryFn: userLogin})
}