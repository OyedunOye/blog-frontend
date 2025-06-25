import { verifyOtpAndLogin } from '@/services/login.services'
import { useMutation } from '@tanstack/react-query'

export const useVerifyOtpAndLogin = () => {

    return useMutation({
        mutationFn: verifyOtpAndLogin,
    })
}