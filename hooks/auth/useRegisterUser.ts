import { createUser } from '@/services/users.service'
import {useMutation} from '@tanstack/react-query'

export const useRegisterUser = () => {
    //The useMutation hook is one of the most powerful and versatile tools provided by React Query. While useQuery is widely used for fetching and managing data, useMutation is the go-to choice for writing operations, such as creating, updating, or deleting data on the backend

    return useMutation({
        mutationFn: createUser
    })
}