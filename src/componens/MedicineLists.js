import React, { useState, useEffect } from 'react';
import Medicineinput from './Medicineinput';
import './app.css';

function MedicineLists() {
  const [medicines, setMedicines] = useState([]);
  const [company, setCompany] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [viewMedicineList, setViewMedicineList] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // New state for tracking the index being edited

  const addMedicine = () => {
    const newMedicine = {
      company,
      medicineName,
      quantity,
      price,
    };

    setMedicines([...medicines, newMedicine]);
    setCompany('');
    setMedicineName('');
    setQuantity('');
    setPrice('');
    setUpdateMessage('Successfully updated!');
  };
const editMedicine = (index, field, value) => {
  const updatedMedicines = [...medicines];
  updatedMedicines[index] = {
    ...updatedMedicines[index],
    [field]: value,
  };
  setMedicines(updatedMedicines);
  setEditIndex(index);
  setCompany(updatedMedicines[index].company);
  setMedicineName(updatedMedicines[index].medicineName);
  setQuantity(updatedMedicines[index].quantity);
  setPrice(updatedMedicines[index].price);
};
 const saveMedicine = (index) => {
  const updatedMedicines = [...medicines];
  updatedMedicines[index] = {
    company,
    medicineName,
    quantity,
    price,
  };
  setMedicines(updatedMedicines);
  setEditIndex(-1);
  setUpdateMessage('Changes saved!');
};
  const closeList = () => {
    setViewMedicineList(false);
    setUpdateMessage('List Closed');
  
    setTimeout(() => {
      setUpdateMessage('');
    }, 2000);
  };
  

  return (
    <div className="app-container">
      <header className="header">MediStore Manager</header>
      <div className="input-container">
        <label>Company Name:</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />

        <label>Medicine Name:</label>
        <input type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />

        <label>Quantity:</label>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={addMedicine}>Add Medicine</button>
      </div>
      {updateMessage && (
        <div className="update-message-box">
          <div className="update-message">{updateMessage}</div>
        </div>
      )}
      {medicines.length > 0 && !viewMedicineList && (
        <div className="view-list-button-container">
          <button onClick={() => setViewMedicineList(true)}>View Medicine List</button>
        </div>
      )}
      {viewMedicineList && (
        <div className="view-list-container">
          <Medicineinput
            medicines={medicines}
            editMedicine={editMedicine}
            saveMedicine={saveMedicine}
            editIndex={editIndex}
          />
          <button className="close-list-button" onClick={closeList}>
            Close List
          </button>
        </div>
      )}
    </div>
  );
}

export default MedicineLists;