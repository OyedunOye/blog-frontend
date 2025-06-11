import { toggleBookmarkABlog } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'

export const useToggleBookmarkABlog = () => {

    return useMutation({
        mutationFn: toggleBookmarkABlog,
    })
}
