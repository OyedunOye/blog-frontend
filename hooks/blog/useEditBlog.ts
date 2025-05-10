import { editBlog } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useEditBlog = () => {

    return useMutation({
        mutationFn: editBlog,

    })
}