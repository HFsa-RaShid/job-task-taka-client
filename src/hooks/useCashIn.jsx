import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCashIn = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: useCashIn = [] } = useQuery({
    queryKey: ['useCashIn'],
    queryFn: async () => {
      const token = localStorage.getItem('token'); 
      const res = await axiosSecure.get('/cashInRequest', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return res.data;
    }
  });
  return [useCashIn, refetch];
};

export default useCashIn;