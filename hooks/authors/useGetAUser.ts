import { getAUser } from '@/services/users.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAUser = () => {

    return useQuery({
        queryKey:['aUser'],
        queryFn: getAUser,
    })
}
