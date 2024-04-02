import React, { useState, useEffect } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MedicineLists.css";

const MedicineLists = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineSelected, setMedicineSelected] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [existingMedicines, setExistingMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [showNewMedicineForm, setShowNewMedicineForm] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingMedicines = async () => {
      try {
        const response = await fetch(
          "https://nearest-pharma-be.vercel.app/medicine/"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Medicines retrieved successfully:", data.data);
          setExistingMedicines(data.data);
        } else {
          throw new Error("Failed to fetch existing medicines");
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchExistingMedicines();
  }, []);

  const handleAddMedicine = async () => {
    try {
      if (medicineName === "") {
        setUpdateMessage("Medicine Name is required!");
      } else {
        const response = await fetch(
          "https://nearest-pharma-be.vercel.app/medicine/new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              medicineName,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Medicine added successfully:", data);
          setExistingMedicines([
            ...existingMedicines,
            { medicineName, quantity: medicineQuantity },
          ]);
          setUpdateMessage("Medicine added successfully!");
          setMedicineName("");
          setMedicineQuantity("");
          setMedicinePrice("");
          setShowNewMedicineForm(false);
        } else {
          console.error("Failed to add medicine:", response.statusText);
          setUpdateMessage("Failed to add medicine");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setUpdateMessage("Failed to add medicine");
    }
  };

  const handleRegisterMedicine = async () => {
    try {
      console.log("handleRegisterMedicine", medicineSelected)
      if (medicineQuantity === "") {
        setUpdateMessage("Medicine Quantity is required!");
      }
      else if (medicineSelected === "") {
        setUpdateMessage("Medicine is required!");
      }else if (medicinePrice === "") {
        setUpdateMessage("Medicine Price is required!")
      } else {
        const response = await fetch(
          "https://nearest-pharma-be.vercel.app/pharmacy/registerMedicine",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pharmacyId: userInfo._id,
              medicineId: medicineSelected,
              medicineQuantity: parseInt(medicineQuantity),
              price: parseInt(medicinePrice),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Medicine registered successfully:", data);
          localStorage.setItem('pharmacyId', "65f8c6aa05dbd4129a257f10");
          localStorage.setItem('medicineId', "65f98fde5b41e43553f9d987");

          setUpdateMessage("Medicine registered successfully!");
          navigate("/updatedmedicinelist");
        } else {
          console.error("Failed to register medicine:", response.statusText);
          setUpdateMessage("Failed to register medicine");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setUpdateMessage("Failed to register medicine");
    }
  };

  const handleSelectMedicine = (event) => {
    setSelectedMedicine(event.target.value);
  };

  const handleCreateNewMedicine = () => {
    setShowNewMedicineForm(true);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    navigate("/updatedmedicinelist");
  };

  
  return (
    <div className="app-container">
      <header className="header">MediStore Manager</header>
      <div className="view-medicine-container">
        <Button className="view-medicine-button" onClick={handleSubmit}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          View List
        </Button>
      </div>
      <div className="logout-container">
        <Button className="logout-button" onClick={handleLogout}
          style={{
            color: "red",
          }}
        >
          Logout
        </Button>
      </div>
      <div className="form-container">
        <div className="input-field">
          <label htmlFor="medicineName">Medicine Name:</label>
          <TextField
            select
            id="medicineName"
            value={selectedMedicine}
            onChange={(event) => {
              handleSelectMedicine(event);
              setMedicineSelected(event.target.value);
            }}
            variant="outlined"
            fullWidth
            required
          >
            {Array.isArray(existingMedicines) &&
              existingMedicines.map((medicine, index) => (
                <MenuItem key={medicine._id} value={medicine._id}>
                  {medicine.medicineName}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="form-group">
          <label htmlFor="medicineQuantity">Quantity:</label>
          <input
            type="number"
            id="medicineQuantity"
            min={0}
            value={medicineQuantity}
            onChange={(e) => setMedicineQuantity(e.target.value)}
            className="input-field"
            variant="outlined"
            required
            fullWidth
            style={{width:"540px"}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicinePrice">Price:</label>
          <input
            type="number"
            id="medicinePrice"
            min={0}
            value={medicinePrice}
            onChange={(e) => setMedicinePrice(e.target.value)}
            className="input-field"
            variant="outlined"
            required
            fullWidth
            style={{width:"540px"}}
          />
        </div>
        <div className="form-buttons">
          <Button className="add-button" 
            onClick={handleRegisterMedicine}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              margin: "3px"
            }}
          >
            Add Medicine
          </Button>
          <Button className="add-button" onClick={handleCreateNewMedicine} 
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              margin: "3px"
            }}
          >
            Create New Medicine
          </Button>
        </div>
      </div>
      {showNewMedicineForm && (
        <div className="form-container">
          <h3>Create New Medicine</h3>
          <div className="form-group">
            <label htmlFor="newMedicineName">Medicine Name:</label>
            <input
              type="text"
              id="newMedicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="input-field"
              required
              fullWidth
              style={{width:"540px"}}
            />
          </div>
          <div className="form-buttons">
            <Button
              className="add-button"
              onClick={handleAddMedicine}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                margin: "3px",
              }}
            >
              Save
            </Button>
            <Button
              className="add-button"
              onClick={() => setShowNewMedicineForm(false)}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                margin: "3px"
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {updateMessage && (
        <div className="update-message-box">
          <div className="update-message">{updateMessage}</div>
        </div>
      )}
    </div>
  );
}

export default MedicineLists;

