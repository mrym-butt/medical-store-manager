import React from "react";

const Medicineinput = ({
  medicines,
  editMedicine,
  saveMedicine,
  editIndex,
}) => {

  return (
    <div className="medicine-list">
      <h2>Medicine List</h2>
      <ul>
        {medicines.map((medicine, index) => (
          <li key={index}>
            <strong>Company:</strong>{" "}
            {editIndex !== index ? (
              <span>{medicine.company}</span>
            ) : (
              <input
                type="text"
                value={medicine.company}
                onChange={(e) => editMedicine(index, "company", e.target.value)}
              />
            )}
            <strong>Medicine Name:</strong>{" "}
            {editIndex !== index ? (
              <span>{medicine.medicineName}</span>
            ) : (
              <input
                type="text"
                value={medicine.medicineName}
                onChange={(e) =>
                  editMedicine(index, "medicineName", e.target.value)
                }
              />
            )}
            <strong>Quantity:</strong>{" "}
            {editIndex !== index ? (
              <span>{medicine.quantity}</span>
            ) : (
              <input
                type="text"
                value={medicine.quantity}
                onChange={(e) =>
                  editMedicine(index, "quantity", e.target.value)
                }
              />
            )}
            <strong>Price:</strong>{" "}
            {editIndex !== index ? (
              <span>{medicine.price}</span>
            ) : (
              <input
                type="text"
                value={medicine.price}
                onChange={(e) => editMedicine(index, "price", e.target.value)}
              />
            )}
            {editIndex !== index ? (
              <button
                className="green-button"
                onClick={() => editMedicine(index)}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className="save-button"
                  onClick={() => saveMedicine(index)}
                >
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => editMedicine(-1)}
                >
                  Cancel
                </button>
                {/* <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  View Medicine List
                </Button> */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicineinput;
