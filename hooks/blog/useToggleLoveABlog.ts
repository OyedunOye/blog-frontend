import { toggleLoveABlog } from '@/services/blog.services'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export const useToggleLoveABlog = () => {

    return useMutation({
        mutationFn: toggleLoveABlog,
    })
}

// export const useToggleLoveABlog = (blogId:string) => {
//     return useQuery({
//         queryKey:['loves'],
//         queryFn: async ()=> await toggleLoveABlog(blogId)
//     })
// }