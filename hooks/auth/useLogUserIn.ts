import { userLogin } from '@/services/login.services'
import { useMutation } from '@tanstack/react-query'

export const useLogUserIn = () => {

    return useMutation({
        mutationFn: userLogin,
    })
}