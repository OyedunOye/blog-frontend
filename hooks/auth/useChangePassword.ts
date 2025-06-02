import { changeUserPassword } from '@/services/users.service'
import {useMutation} from '@tanstack/react-query'

export const useChangePassword = () => {

    return useMutation({
        mutationFn: changeUserPassword
    })
}