import {
  Box,
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { apiURL } from "./temp";

const Signin = () => {
 
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: 410,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#6767d4" };
  const initialValues = {
    Username: "",
    password: "",
    remember: false,
  };

  const navigate = useNavigate();
  const HandleSubmit = async (values, props) => {
    try {
      const response = await fetch(`${apiURL}/pharmacy/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.Username,
            password: values.password,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log(data); 
      localStorage.setItem("user-info", JSON.stringify(data));
  
      navigate("/updatedmedicinelist");
      setTimeout(() => {
        props.resetForm();
        props.setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  const handleChange = (values, props) => {
    navigate("/Registration");
  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string()
      .required("Required"),
    password: Yup.string().required("Required"),
  });
  // function login(){
  //   console.warn(Username,Password)
  // }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={HandleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Box my={2}>
                <Field
                  as={TextField}
                  label="Username"
                  name="Username"
                  values="Username"
                  // type="email"
                  placeholder="Enter username"
                  // onChange={(e) => setUsername(e.target.value)}
                  helperText={<ErrorMessage name="Username" />}
                  fullWidth
                  required
                />
              </Box>
              <Box my={2}>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  values="Password"
                  placeholder="Enter password"
                  type="password"
                  // onChange={(e) => setPassword(e.target.value)}
                  helperText={<ErrorMessage name="password" />}
                  fullWidth
                  required
                />
              </Box>
              <Grid container alignItems="center" justifyContent="flex-start">
                <Field
                  as={FormControlLabel}
                  name="remember"
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                fullWidth
                onSubmit={props.HandleSubmit}
                // onClick={login}
              >
                {props.isSubmitting ? "Loading" : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
        <Box my={2} textAlign="left">
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Don't have an account ?
            <Link href="#" onClick={() => handleChange("event", 1)}>
              {" "}
              Register
              {/* Signup */}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Signin;
