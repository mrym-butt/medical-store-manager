import React, { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Avatar,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import { apiURL } from "./temp";

const Registration = () => {
  const paperStyle = {
    padding: 20,
    height: "140vh",
    width: 410,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#6767d4" };
  const initialValues = {
    // organizationName: "",
    branchName: "",
    address: "",
    // area: "",
    // city: "",
    // country: "",
    username: "",
    password: "",
    daysOpen: "",
    openTime: "",
    // CloseTime: "",
    location: {
      coordinates: [],
    },
    rating: "",
    services: {
      inStorePicking: false,
      inStoreShopping: true,
      inStoreDelivery: true,
      paymentCash: false,
    },
    areaId: "",
    mapUrl: "",
  };
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const HandleSubmit = async (values, props) => {
    try {
      console.log("Form Values:", values);
      const response = await fetch(
        "https://nearest-pharma-be.vercel.app/pharmacy/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: values.username,
            password: values.password,
            branchName: values.branchName,
            location: {
              type: "Point",
              coordinates: [
                values.location.coordinates[0],
                values.location.coordinates[1],
              ],
            },
            rating: values.rating,
            daysOpen: values.daysOpen.split(",").map((day) => day.trim()),
            openTime: values.openTime,
            services: values.services,
            areaId: values.areaId,
            mapUrl: values.mapUrl,
            address: values.address,
          }),
        }
      );
      console.log("Form Values:", values);
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data);
      navigate("/signin");

      setTimeout(() => {
        props.resetForm();
        props.setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Username Alreadys Exists");
    }
  };
  return (
    <Grid>
      <Paper elevation="20" style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AppRegistrationIcon />
          </Avatar>
          <h2 align="center">Vendor Registration Form</h2>
        </Grid>
        {errorMessage && (
          <Typography color="error" align="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Formik initialValues={initialValues} onSubmit={HandleSubmit}>
          {(props) => (
            <Form>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Organization Name"
                    name="organizationName"
                    helperText={<ErrorMessage name="organizationName" />}
                    placeholder="Enter organization name"
                    fullWidth
                    required
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Branch Name"
                    name="branchName"
                    helperText={<ErrorMessage name="branchName" />}
                    placeholder="Enter branch name"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Address"
                    name="address"
                    helperText={<ErrorMessage name="address" />}
                    placeholder="Enter address"
                    fullWidth
                    type="text"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Area ID"
                    name="areaId"
                    fullWidth
                    type="text"
                    // disabled
                  />
                </Grid>

                {/* <Grid item xs={6}>
                  <Field
                    as={TextField}
                    select
                    label="City"
                    name="city"
                    helperText={<ErrorMessage name="city" />}
                    placeholder="City"
                    value={cityValue}
                    onChange={handleCityChange}
                    fullWidth
                  >
                    <MenuItem value="Karachi" label="Karachi">
                      Karachi
                    </MenuItem>
                    <MenuItem value="Hyderabad" label="Hyderabad">
                      Hyderabad
                    </MenuItem>
                    <MenuItem value="Islamabad" label="Islamabad">
                      Islamabad
                    </MenuItem>
                    <MenuItem value="Lahore" label="Lahore">
                      Lahore
                    </MenuItem>
                    <MenuItem value="Faislabad" label="Faisalabad">
                      Faisalabad
                    </MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    select
                    label="Country"
                    name="country"
                    helperText={<ErrorMessage name="country" />}
                    placeholder="Country"
                    fullWidth
                    value={CountryValue}
                    onChange={handleCountryChange}
                  >
                    <MenuItem value="Pakistan" label="Pakistan">
                      Pakistan
                    </MenuItem>
                  </Field>
                </Grid> */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="username"
                    name="username"
                    helperText={<ErrorMessage name="username" />}
                    placeholder="Enter username"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="password"
                    name="password"
                    helperText={<ErrorMessage name="password" />}
                    placeholder="Enter password"
                    fullWidth
                    type="password"
                    required
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Confirm password"
                    name="confirmpassword"
                    helperText={<ErrorMessage name="confirmpassword" />}
                    placeholder="confirm password"
                    fullWidth
                    type="password"
                    required
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <InputLabel>Days Open</InputLabel>
                  <Field
                    as={TextField}
                    select
                    name="daysOpen"
                    fullWidth
                    multiple
                    required
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Open Time"
                    name="openTime"
                    placeholder="open time"
                    type="time"
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Close Time"
                    name="CloseTime"
                    placeholder="close time"
                    type="time"
                    fullWidth
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Latitude"
                    name="location.coordinates.0"
                    type="number"
                    placeholder="Latitude"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Longitude"
                    name="location.coordinates.1"
                    type="number"
                    placeholder="Longitude"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Map URL"
                    name="mapUrl"
                    placeholder="Enter map URL"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="number"
                    label="Rating"
                    name="rating"
                    helperText={<ErrorMessage name="rating" />}
                    fullWidth
                    required
                    inputProps={{
                      step: 0.1, // Allow decimal steps
                      min: 1,
                      max: 5,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>services</InputLabel>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            name="services.inStorePicking"
                            color="primary"
                          />
                        }
                        label="In-Store Picking"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            name="services.inStoreShopping"
                            color="primary"
                          />
                        }
                        label="In-Store Shopping"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            name="services.inStoreDelivery"
                            color="primary"
                          />
                        }
                        label="In-Store Delivery"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            name="services.paymentCash"
                            color="primary"
                          />
                        }
                        label="Payment in Cash"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={props.isSubmitting}
                    fullWidth
                  >
                    {props.isSubmitting ? "Loading" : "Register"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Registration;
