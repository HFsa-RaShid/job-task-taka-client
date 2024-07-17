import { useAuth } from "../../Provider/AuthProvider";
import ApproveUser from "../Admin/ApproveUser/ApproveUser";


const Home = () => {
    const { currentUser, logout } = useAuth();
    return (
        <div className="container mx-auto">
           
            <ApproveUser></ApproveUser>
            
            
        </div>
    );
};

export default Home;