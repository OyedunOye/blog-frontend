import { deleteComment } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useDeleteComment = () => {

    return useMutation({
        mutationFn: deleteComment,

    })
}