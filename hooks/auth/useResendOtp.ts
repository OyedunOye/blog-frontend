import { resendOtp } from '@/services/login.services'
import { useMutation } from '@tanstack/react-query'

export const useResendOtp = () => {

    return useMutation({
        mutationFn: resendOtp,
    })
}