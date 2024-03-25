// import React, { useState } from "react";
// import { FaPlus, FaTrash } from "react-icons/fa"; 
// import { useLocation, useNavigate } from "react-router-dom"; 
// import "./UpdatedMedicineList.css"; 
// function UpdatedMedicineList() {
//   const location = useLocation();
//   const { state } = location;
//   const navigate = useNavigate(); 

//   const [medicines, setMedicines] = useState(state ? state.medicines || [] : []);

//   const handleDelete = (index) => {
//     const updatedMedicines = [...medicines];
//     updatedMedicines.splice(index, 1);
//     setMedicines(updatedMedicines);
//   };

//   const handleAddMedicine = () => {
//     navigate("/medicinelists"); 
//   };

//   return (
//     <div>
//       <div className="medicine-header">
//         <h2>Updated Medicine List</h2>
//         <FaPlus className="plus-sign" onClick={handleAddMedicine} /> {/* Add onClick event to handleAddMedicine */}
//       </div>
//       <table className="medicine-table">
//         <thead>
//           <tr>
//             {/* <th>Company</th> */}
//             <th>Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Action</th> 
//           </tr>
//         </thead>
//         <tbody>
//           {medicines.map((medicine, index) => (
//             <tr key={index}>
//               {/* <td>{medicine.company}</td> */}
//               <td>{medicine.medicineName}</td>
//               <td>{medicine.quantity}</td>
//               <td>{medicine.price}</td>
//               <td>
//                 <button className="delete-button" onClick={() => handleDelete(index)}>
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UpdatedMedicineList;

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdatedMedicineList.css";

function UpdatedMedicineList() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState(state ? state.medicines || [] : []);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("https://nearest-pharma-be.vercel.app/medicine/");
        if (response.ok) {
          const data = await response.json();
          setMedicines(data.data);
        } else {
          throw new Error("Failed to fetch medicines");
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://nearest-pharma-be.vercel.app/medicine/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedMedicines = medicines.filter((medicine) => medicine._id !== id);
        setMedicines(updatedMedicines);
      } else {
        throw new Error("Failed to delete medicine");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleAddMedicine = () => {
    navigate("/medicinelists");
  };

  return (
    <div>
      <div className="medicine-header">
        <h2>Updated Medicine List</h2>
        <FaPlus className="plus-sign" onClick={handleAddMedicine} />
      </div>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.medicineName}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.price}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(medicine._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdatedMedicineList;