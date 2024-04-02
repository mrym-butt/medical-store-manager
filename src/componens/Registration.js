import React, { useState } from "react";
import { Grid, Paper, Avatar, Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Registration = () => {
  const paperStyle = {
    padding: 20,
    height: "fit-content",
    width: 400,
    margin: "50px auto",
  };
  const avatarStyle = { backgroundColor: "#4CAF50" };
  const data = {
    branchName: "",
    address: "",
    username: "",
    password: "",
    daysOpen: [],
    openTime: "",
    rating: "",
    location: {
      coordinates: ["", ""],
    },
    mapUrl: "",
    services: {
      inStorePicking: false,
      inStoreShopping: true,
      inStoreDelivery: true,
      paymentCash: false,
    },
  };
  const [inputData, setInputData] = useState(data);
  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name.startsWith("services.")) {
        setInputData({
          ...inputData,
          services: { ...inputData.services, [name.split(".")[1]]: checked },
        });
      } else if (name.startsWith("daysOpen")) {
        setInputData({
          ...inputData,
          daysOpen: checked
            ? [...inputData.daysOpen, name.split(".")[1]]
            : inputData.daysOpen.filter((day) => day !== name.split(".")[1]),
        });
      } else {
        setInputData({ ...inputData, [name]: value });
      }
    } else {
      setInputData({ ...inputData, [name]: value });
      if (name === "mapUrl") {
        setInputData({ ...inputData, mapUrl: value });
      }
    }
    console.log("Input Data:", inputData);
  };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Input Data:", inputData);
  
    if (
      !inputData.branchName ||
      !inputData.address ||
      !inputData.username ||
      !inputData.password ||
      !inputData.daysOpen ||
      !inputData.openTime ||
      !inputData.rating ||
      !inputData.location ||
      !inputData.mapUrl ||
      !inputData.services
    ) {
      console.log("Form Data:", inputData);
      alert("All fields are Mandatory");
      return;
    }
  
    try {
      console.log("Form Values:", inputData);
      const response = await fetch(
        "https://nearest-pharma-be.vercel.app/pharmacy/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputData.username,
            password: inputData.password,
            branchName: inputData.branchName,
            location: {
              type: "Point",
              coordinates: [
                inputData.location.coordinates[0],
                inputData.location.coordinates[1],
              ],
            },
            rating: inputData.rating,
            daysOpen: inputData.daysOpen,
            openTime: inputData.openTime,
            services: inputData.services,
            areaId: "65f8c337701d44c75ec1c9d7",
            mapUrl: inputData.mapUrl,
            address: inputData.address,
          }),
        }
      );
  
      if (!response.ok) {
        const data = await response.json();
        if (data.error === "Username already exists") {
          setErrorMessage("Username Already Exists");
        } else {
          throw new Error("Registration failed");
        }
      } else {
        const data = await response.json();
        console.log(data);
        navigate("/signin");
        localStorage.setItem("areaId", "65f8c337701d44c75ec1c9d7");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setInputData({
          ...inputData,
          location: {
            ...inputData.location,
            coordinates: [longitude, latitude],
          },
          mapUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
        });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={3} style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar style={avatarStyle}>
              <AppRegistrationIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" align="center">
              Pharmacy Registration Form
            </Typography>
          </Grid>
          {errorMessage && (
            <Grid item>
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <form onSubmit={HandleSubmit} style={{ width: "100%" }}>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  name="branchName"
                  placeholder="Enter branch name"
                  required
                  value={inputData.branchName}
                  onChange={handleData}
                  style={{
                    width: "93%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  required
                  value={inputData.address}
                  onChange={handleData}
                  style={{
                    width: "93%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  required
                  value={inputData.username}
                  onChange={handleData}
                  style={{
                    width: "93%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={inputData.password}
                  onChange={handleData}
                  style={{
                    width: "93%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <label>Days Open</label>
              <div
                value={inputData.daysOpen}
                onChange={handleData}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Monday"
                      style={{ marginRight: "5px" }}
                    />
                    Monday
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Tuesday"
                      style={{ marginRight: "5px" }}
                    />
                    Tuesday
                  </label>
                </div>
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Wednesday"
                      style={{ marginRight: "5px" }}
                    />
                    Wednesday
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Thursday"
                      style={{ marginRight: "5px" }}
                    />
                    Thursday
                  </label>
                </div>
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Friday"
                      style={{ marginRight: "5px" }}
                    />
                    Friday
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Saturday"
                      style={{ marginRight: "5px" }}
                    />
                    Saturday
                  </label>
                </div>
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="Sunday"
                      style={{ marginRight: "5px" }}
                    />
                    Sunday
                  </label>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="openTime">Open Time</label>
                <input
                  type="time"
                  name="openTime"
                  placeholder="Open time"
                  value={inputData.openTime}
                  onChange={handleData}
                  style={{
                    width: "94%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <label>Rating</label>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="number"
                  name="rating"
                  placeholder="Enter rating"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  style={{
                    width: "93%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  value={inputData.rating}
                  onChange={handleData}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <label>Latitude</label>
                    <input
                      type="text"
                      value={center.lat}
                      required
                      readOnly
                      style={{
                        width: "88%", 
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div>
                    <label>Longitude</label>
                    <input
                      type="text"
                      value={center.lng}
                      required
                      readOnly
                      style={{
                        width: "88%", 
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
                <label>Map URL</label>
                <div>
                  <input
                    type="text"
                    name="mapUrl"
                    value={inputData.mapUrl}
                    onChange={handleData}
                    placeholder="Enter map url"
                    style={{
                      width: "94%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <button
                  variant="contained"
                  color="primary"
                  onClick={handleGetLocation}
                  style={{
                    marginBottom: "10px",
                    width: "50%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    background: "#4CAF50",
                    color: "white",
                  }}
                >
                  Get Location
                </button>
                <LoadScript googleMapsApiKey="YOUR_API_KEY">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "150px" }}
                    center={center}
                    zoom={13}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <label>Services</label>
              <div
                value={inputData.services}
                onChange={handleData}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="services.inStorePicking" />
                    In-Store Picking
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="services.inStoreDelivery" />
                    In-Store Delivery
                  </label>
                </div>
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="services.inStoreShopping" />
                    In-Store Shopping
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="services.paymentCash" />
                    Payment in Cash
                  </label>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}></div>
              <button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={HandleSubmit}
                style={{
                  width: "94%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  background: "#4CAF50",
                  color: "white",
                }}
              >
                Register
              </button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Registration;
