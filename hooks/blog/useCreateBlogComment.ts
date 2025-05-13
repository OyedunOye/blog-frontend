import { createBlogComment } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useCreateBlogComment = () => {

    return useMutation({
        mutationFn: createBlogComment,
    })
}