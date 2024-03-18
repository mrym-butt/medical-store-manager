import React, { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Avatar,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const paperStyle = {
    padding: 20,
    height: "140vh",
    width: 410,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#6767d4" };
  const initialValues = {
    organizationName: "",
    branchName: "",
    address: "",
    area: "",
    city: "",
    country: "",
    Username: "",
    Password: "",
    DaysOpen: "",
    OpenTime: "",
    CloseTime: "",
  };
  const [cityValue, setCityValue] = useState("");
  const [CountryValue, setCountryValue] = useState("");
  function handleCityChange(event) {
    setCityValue(event.target.value);
    
  }
  function handleCountryChange(event) {
    setCountryValue(event.target.value);
  }
  //   const options=[
  //     {value: "KARACHI", label:"Karachi"},
  //     {value: "Hyderabad", label:"Hyderabad"},
  //     {value: "Islamabad", label:"Islamabad"},
  //     {value: "Lahore", label:"Lahore"},
  //     {value: "Faislabad", label:"Faislabad"}
  //   ]
  //   const [city, setCity] = useState("");

  //   const handleCityChange = (selectedOption) => {
  //     setCity(selectedOption);
  //   };
  // const validationSchema = Yup.object().shape({
  //   organizationName: Yup.string().required("Required"),
  //   branchName: Yup.string().required("Required"),
  //   address: Yup.string().required("Required"),
  //   area: Yup.string().required("Required"),
  //   city: Yup.string().required("Required"),
  //   country: Yup.string().required("Required"),
  //   Username: Yup.string().required("Required"),
  //   Password: Yup.string()
  //     .min(8, "Password minimum length should be 8")
  //     .required("Required"),
  //   confirmpassword: Yup.string()
  //     .oneOf([Yup.ref("password")], "Password not matched")
  //     .required("Required"),
  // });
  const navigate = useNavigate();
  const HandleSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    navigate("/signin");
    // history.push("/signin");
    // <Redirect to='/signin'/>

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
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
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={HandleSubmit}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Organization Name"
                    name="organizationName"
                    helperText={<ErrorMessage name="organizationName" />}
                    placeholder="Enter organization name"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Branch Name"
                    name="branchName"
                    helperText={<ErrorMessage name="branchName" />}
                    placeholder="Enter branch name"
                    fullWidth
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
                    label="Area"
                    name="area"
                    helperText={<ErrorMessage name="area" />}
                    placeholder="Area"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Username"
                    name="Username"
                    helperText={<ErrorMessage name="Username" />}
                    placeholder="Enter username"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Password"
                    name="Password"
                    helperText={<ErrorMessage name="Password" />}
                    placeholder="Enter password"
                    fullWidth
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Confirm Password"
                    name="confirmPassword"
                    helperText={<ErrorMessage name="confirmPassword" />}
                    placeholder="confirm password"
                    fullWidth
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="DaysOpen"
                    name="DaysOpen"
                    placeholder="Open Days"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Open Time"
                    name="OpenTime"
                    placeholder="open time"
                    type="time"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Close Time"
                    name="CloseTime"
                    placeholder="close time"
                    type="time"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={props.isSubmitting}
                    fullWidth

                    // onSubmit={props.HandleSubmit}
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
