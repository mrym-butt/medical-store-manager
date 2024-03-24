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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UpdatedMedicineList.css";

function UpdatedMedicineList() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get("https://nearest-pharma-be.vercel.app/medicine/")
      .then(response => {
        setMedicines(response.data);
      })
      .catch(error => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  const handleDelete = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
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
      {Array.isArray(medicines) && medicines.length > 0 ? (
        <table className="medicine-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.medicineName}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.price}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-medicines-message">
          <p>No medicines available</p>
        </div>
      )}
    </div>
  );
}

export default UpdatedMedicineList;