

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Provider/AuthProvider';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data) => {
    const { email, pin } = data;

    axiosPublic.post('/login', { email, pin })
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        login(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => {
        console.error('Login error:', error.response.data);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login failed",
          text: error.response.data.message,
          showConfirmButton: true
        });
      });
  };

  return (
    <form className="card-body max-w-md border mx-auto shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-center font-bold">Sign In Here!!</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Email</span>
        </label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered"
        />
        {errors.email && <span className="text-red-700 italic">Email is required</span>}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">PIN</span>
        </label>
        <input
          type="password"
          name="pin"
          {...register("pin", {
            required: true,
            pattern: /^[0-9]{5}$/
          })}
          placeholder="5-digit PIN"
          className="input input-bordered"
        />
        {errors.pin?.type === 'required' && <span className="text-red-700 italic">PIN is required</span>}
        {errors.pin?.type === 'pattern' && <span className="text-red-700 italic">PIN must be a 5-digit number</span>}
      </div>
      <div className="form-control mt-1">
        <button type="submit" className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-black px-3 text-xl font-bold w-full">Sign In</button>
      </div>
      <p className="text-center mt-2">
        Don't have an account yet? Please <Link to="/signup">
          <button className="text-blue-400 underline font-bold">Sign Up</button>
        </Link>
      </p>
    </form>
  );
};

export default Login;





  

 
