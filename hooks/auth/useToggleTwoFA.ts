import { toggleTwoFA } from '@/services/users.service'
import {useMutation} from '@tanstack/react-query'

export const useToggleTwoFA = () => {

    return useMutation({
        mutationFn: toggleTwoFA
    })
}