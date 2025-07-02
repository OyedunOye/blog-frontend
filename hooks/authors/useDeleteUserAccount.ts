import { deactivateUserAccount } from "@/services/users.service"
import { useMutation } from "@tanstack/react-query"

export const useDeactivateUserAccount = () =>{
    return useMutation({
        mutationFn: deactivateUserAccount,
    })
}