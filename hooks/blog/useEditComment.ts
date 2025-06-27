import { editComment } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useEditComment = () => {

    return useMutation({
        mutationFn: editComment,

    })
}