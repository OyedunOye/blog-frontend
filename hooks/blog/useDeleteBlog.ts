import { deleteBlog } from "@/services/blog.services"
import { useMutation } from "@tanstack/react-query"

export const useDeleteABlog = (blogId:string) =>{
    return useMutation({
        // queryKey:['deleteABlog', blogId],
        mutationFn: deleteBlog,
    })
}