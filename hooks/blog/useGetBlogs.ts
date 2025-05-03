import { getAllBlogs, getASingleBlog } from '@/services/blog.services'
import { useQuery } from '@tanstack/react-query'

// const blogId = "68114006d8fb3beeef33d66c"

export const useGetAllBlogs = () => {

    return useQuery({
        queryKey:['blogs'],
        queryFn: getAllBlogs,
    })
}

export const useGetASingleBlog = (blogId:string) =>{
    return useQuery({
        queryKey:['blogOfWeek', blogId],
        queryFn:async () => await getASingleBlog(blogId),
    })
}