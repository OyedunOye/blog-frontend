import { createBlog } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useCreateBlog = () => {

    return useMutation({
        mutationFn: createBlog,
    })
}