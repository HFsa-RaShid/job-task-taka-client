// import React, { useEffect, useState } from 'react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';
// import useAxiosPendingUser from '../../../hooks/useAxiosPendingUser';

// const ApproveUser = () => {
// //   const [pendingUsers, setPendingUsers] = useState([]);
//   const axiosPublic = useAxiosPublic();
//   const [refetch, pendingUsers] = useAxiosPendingUser();

//   const approveUser = (userId) => {
//     axiosPublic.post('/approve-user', { userId })
//       .then(response => {
//         Swal.fire({
//           position: 'top-end',
//           icon: 'success',
//           title: 'User approved successfully',
//           showConfirmButton: false,
//           timer: 1500
//         });
        
//         refetch();
//       })
//       .catch(error => {
//         console.error('Error approving user:', error);
//         Swal.fire({
//           position: 'top-end',
//           icon: 'error',
//           title: 'Approval failed',
//           text: error.response.data.message,
//           showConfirmButton: true
//         });
//       });
//   };
//   if (!pendingUsers || pendingUsers.length === 0) {
//     return <div className="max-w-4xl mx-auto mt-10">No pending users for approval</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h1 className="text-3xl text-center font-bold mb-5">Pending User Approvals</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Mobile</th>
//               <th className="px-4 py-2">Role</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingUsers.map(user => (
//               <tr key={user._id} className="border-t">
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">{user.mobile}</td>
//                 <td className="px-4 py-2">{user.role}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => approveUser(user._id)}
//                     className="btn btn-outline border-0 border-b-2 border-t-2 border-black text-black px-3 text-xl font-bold"
//                   >
//                     Approve
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApproveUser;


import React from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosPendingUser from '../../../hooks/useAxiosPendingUser';

const ApproveUser = () => {
  const axiosPublic = useAxiosPublic();
  const [pendingUsers, refetch] = useAxiosPendingUser();

  const approveUser = (userId) => {
    axiosPublic.post('/approve-user', { userId })
      .then(response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User approved successfully',
          showConfirmButton: false,
          timer: 1500
        });

        refetch();
      })
      .catch(error => {
        console.error('Error approving user:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Approval failed',
          text: error.response.data.message,
          showConfirmButton: true
        });
      });
  };

  if (!pendingUsers || pendingUsers.length === 0) {
    return <div className="max-w-4xl mx-auto mt-10">No pending users for approval</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl text-center font-bold mb-5">Pending User Approvals</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map(user => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.mobile}</td>
                <td className="px-4 py-2">{user.role}</td>
                
                <td className="px-4 py-2">
                  <button
                    onClick={() => approveUser(user._id)}
                    className="btn btn-outline border-0 border-b-2 border-t-2 border-black text-black px-3 text-xl font-bold"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveUser;
