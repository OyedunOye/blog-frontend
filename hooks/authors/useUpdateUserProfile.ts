import { updateUserProfile } from '@/services/users.service'
import {useMutation} from '@tanstack/react-query'

export const useUpdateUserProfile = () => {

    return useMutation({
        mutationFn: updateUserProfile
    })
}