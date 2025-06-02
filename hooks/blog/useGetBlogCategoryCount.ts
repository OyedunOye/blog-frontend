import { getBlogCategoryCount } from '@/services/blog.services'
import { useQuery } from '@tanstack/react-query'

export const useGetBlogCategoryCount = () => {

    return useQuery({
        queryKey:['blogsCategories'],
        queryFn: getBlogCategoryCount,
    })
}
