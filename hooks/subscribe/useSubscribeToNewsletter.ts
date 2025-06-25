import { subscribeToNewsletter } from '@/services/subscribe.services'
import { useMutation } from '@tanstack/react-query'

export const useSubscribeToNewsletter = () => {

    return useMutation({
        mutationFn: subscribeToNewsletter,
    })
}