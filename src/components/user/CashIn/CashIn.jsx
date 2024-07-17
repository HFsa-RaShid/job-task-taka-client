
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../Provider/AuthProvider';
import useAgents from '../../../hooks/useAgents';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CashIn = () => {
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [agents, refetchAgents] = useAgents();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const { agentPhone, amount } = data;
    const agent = agents.find(agent => agent.mobile === agentPhone);
    if (!agent) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Agent Not Found!",
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axiosSecure.post('/cash-in-request', {
        userId: currentUser.id,
        agentId: agent.id,
        amount: parseFloat(amount),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: "Your cash-in request has been sent to the agent.",
        });
        reset(); 
        refetchAgents();
      } else {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: response.data.message || "Failed to send cash-in request.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred while sending the cash-in request.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Cash In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            {...register('amount', { required: true, pattern: /^[0-9]+$/ })}
            className={`w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600`}
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 mt-1">Please enter a valid amount.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="agentPhone" className="block text-gray-700 font-bold mb-2">Agent Phone Number:</label> 
          <input
            type="text"
            id="agentPhone"
            {...register('agentPhone', { required: true })}
            className={`w-full px-3 py-2 border ${errors.agentPhone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600`}
            placeholder="Enter agent phone number"
          />
          {errors.agentPhone && <p className="text-red-500 mt-1">Agent phone number is required.</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Request Cash In
        </button>
      </form>
    </div>
  );
};

export default CashIn;
