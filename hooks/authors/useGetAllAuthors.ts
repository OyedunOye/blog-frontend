import { getAllAuthors } from '@/services/users.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllAuthors = () => {

    return useQuery({
        queryKey:['allAuthors'],
        queryFn: getAllAuthors,
    })
}
