import { unsubscribeToNewsletter } from '@/services/subscribe.services'
import { useMutation } from '@tanstack/react-query'

export const useUnsubscribeToNewsletter = () => {

    return useMutation({
        mutationFn: unsubscribeToNewsletter,
    })
}