
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAgents = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: agents = [] } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const token = localStorage.getItem('token'); 
      const res = await axiosSecure.get('/agents', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return res.data;
    }
  });
  return [agents, refetch];
};

export default useAgents;
