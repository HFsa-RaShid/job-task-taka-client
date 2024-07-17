
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Provider/AuthProvider';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data) => {
    axiosPublic.post('/register', data)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        login(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request send successfully",
          showConfirmButton: false,
          timer: 1500
        });
        reset();
        
      })
      .catch(error => {
        console.error('Registration error:', error.response.data);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Registration failed",
          text: error.response.data.message,
          showConfirmButton: true
        });
      });
  };

  return (
    <form className="card-body max-w-md border mx-auto shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-center font-bold">Sign Up Here!!</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Name</span>
        </label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
          placeholder="Name"
          className="input input-bordered"
        />
        {errors.name && <span className="text-red-700 italic">Name is required</span>}
      </div>
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
          <span className="label-text font-bold">Mobile</span>
        </label>
        <input
          type="tel"
          name="mobile"
          {...register("mobile", {
            required: true,
            pattern: /^[0-9]{11}$/
          })}
          placeholder="Mobile number"
          className="input input-bordered"
        />
        {errors.mobile?.type === 'required' && <span className="text-red-700 italic">Mobile number is required</span>}
        {errors.mobile?.type === 'pattern' && <span className="text-red-700 italic">Mobile number must be a 11-digit number</span>}
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

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Role</span>
        </label>
        <select
          name="role"
          {...register("role", { required: true })}
          className="input input-bordered"
        >
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
        {errors.role && <span className="text-red-700 italic">Role is required</span>}
      </div>
      <div className="form-control mt-1">
        <button type="submit" className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-black px-3 text-xl font-bold w-full">Sign Up</button>
      </div>
      <p className="text-center mt-2">
        Already have an account? Please <Link to="/login">
          <button className="text-blue-400 underline font-bold">Sign In</button>
        </Link>
      </p>
    </form>
  );
};

export default SignUp;




  
