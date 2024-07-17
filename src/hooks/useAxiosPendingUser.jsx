import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAxiosPendingUser = () => {
    const axiosSecure = useAxiosSecure();
   const {refetch, data: pendingUsers = []} = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: async () =>{
        const res = await axiosSecure.get('/pending-users') 
        return res.data;
    }
   })
   return [pendingUsers,refetch]
};

export default useAxiosPendingUser;