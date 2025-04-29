import { getAllBlogs } from '@/services/blog.services'
import { useQuery } from '@tanstack/react-query'

export const useCreateBlog = () => {

    return useQuery({
        queryKey:['blogs'],
        queryFn: getAllBlogs,
    })
}