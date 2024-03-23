import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MedicineLists.css"; // Import CSS file for styling

function MedicineLists() {
  const [medicines, setMedicines] = useState([]);
  const [company, setCompany] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [viewMedicineList, setViewMedicineList] = useState(false); // Define setViewMedicineList
  const navigate = useNavigate();

  const addMedicine = () => {
    const newMedicine = {
      company,
      medicineName,
      quantity,
      price,
    };

    setMedicines([...medicines, newMedicine]);
    setCompany("");
    setMedicineName("");
    setQuantity("");
    setPrice("");
    setUpdateMessage("Successfully updated!");

    setTimeout(() => {
      setUpdateMessage("");
    }, 2000);
  };

  const closeList = () => {
    setViewMedicineList(false);
    setUpdateMessage("List Closed");

    setTimeout(() => {
      setUpdateMessage("");
    }, 2000);
  };

  const handleLogout = () => {
    // Implement your logout logic here, such as clearing local storage or redirecting to a logout page
    navigate("/signin"); // Redirect to the sign-in page
  };

  const handleSubmit = () => {
    navigate("/updated-medicine-list", { state: { medicines } });
  };

  return (
    <div className="app-container">
      <header className="header">MediStore Manager</header>
      <div className="logout-container">
        <Button className="logout-button" onClick={handleLogout}>Logout</Button>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="company">Company Name:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicineName">Medicine Name:</label>
          <input
            type="text"
            id="medicineName"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={addMedicine}>Add Medicine</button>
      </div>
      {updateMessage && (
        <div className="update-message-box">
          <div className="update-message">{updateMessage}</div>
        </div>
      )}
      <Button
        type="button"
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        View Medicine List
      </Button>
      {viewMedicineList && (
        <div className="view-list-container">
          <h2>Medicine List</h2>
          <ul>
            {medicines.map((medicine, index) => (
              <li key={index}>
                {medicine.company} - {medicine.medicineName} - Quantity: {medicine.quantity} - Price: {medicine.price}
              </li>
            ))}
          </ul>
          <button className="close-list-button" onClick={closeList}>
            Close List
          </button>
        </div>
      )}
    </div>
  );
}

export default MedicineLists;
