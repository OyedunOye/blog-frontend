import { deleteUserAccount } from "@/services/users.service"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUserAccount = () =>{
    return useMutation({
        mutationFn: deleteUserAccount,
    })
}