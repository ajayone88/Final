import React, { useState } from "react";
import "./Register.css";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import serviceApi from "../../../service/serviceApi";

const Register = () => {
  const [signUpState, setSignUpState] = useState({
    email_address: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    password: "",
  });
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState("");
  /**
   * @name submitHandler
   * @description It is used to sign up user when user tries to sign up.
   * @param {*} event 
   * @param {*} type 
   */
  const submitHandler = (event, type) => {
    event.preventDefault();
    const keys = Object.keys(signUpState);
    const isFromInvalid = keys.some((key) => signUpState[key] === "");
    if (!isFromInvalid) {
      serviceApi()
        .signUp(signUpState)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ACTIVE") {
            setMessage("Registration Successful. Please Login!");
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          setMessage(error.message);
        });
    } else {
      setTouched(true);
    }
  };

  return (
    <form
      className="register"
      onSubmit={(event) => submitHandler(event, "Register")}
    >  {/**
        * It consists to multiple FormControl to register the user.
        */}
      <FormControl>
        <InputLabel htmlFor="first_name">First Name *</InputLabel>
        <Input
          id="first_name"
          type="text"
          name="first_name"
          value={signUpState.first_name}
          onChange={(e) =>
            setSignUpState({ ...signUpState, first_name: e.target.value })
          }
          aria-describedby="first_name_required"
        />
        <FormHelperText
          style={
            signUpState.first_name === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error
          id="first_name_required"
        >
          required
        </FormHelperText>
      </FormControl>
      <FormControl margin="dense">
        <InputLabel htmlFor="last_name">Last Name *</InputLabel>
        <Input
          id="last_name"
          type="text"
          value={signUpState.last_name}
          onChange={(e) =>
            setSignUpState({ ...signUpState, last_name: e.target.value })
          }
          aria-describedby="last_name_required"
        />
        <FormHelperText
          style={
            signUpState.last_name === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error
          id="last_name_required"
        >
          required
        </FormHelperText>
      </FormControl>
      <FormControl margin="dense">
        <InputLabel htmlFor="email_address">Email *</InputLabel>
        <Input
          id="email_address"
          type="email"
          value={signUpState.email_address}
          onChange={(e) =>
            setSignUpState({ ...signUpState, email_address: e.target.value })
          }
          aria-describedby="email_address_required"
        />
        <FormHelperText
          style={
            signUpState.email_address === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error
          id="email_address_required"
        >
          required
        </FormHelperText>
      </FormControl>
      <FormControl margin="dense">
        <InputLabel htmlFor="password">Password *</InputLabel>
        <Input
          id="password"
          type="password"
          value={signUpState.password}
          onChange={(e) =>
            setSignUpState({ ...signUpState, password: e.target.value })
          }
          aria-describedby="password_required"
        />
        <FormHelperText
          style={
            signUpState.password === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error
          id="password_required"
        >
          required
        </FormHelperText>
      </FormControl>
      <FormControl margin="dense">
        <InputLabel htmlFor="mobile_number">Contact No *</InputLabel>
        <Input
          id="mobile_number"
          type="number"
          value={signUpState.mobile_number}
          onChange={(e) =>
            setSignUpState({ ...signUpState, mobile_number: e.target.value })
          }
          aria-describedby="mobile_number_required"
        />
        <FormHelperText
          style={
            signUpState.mobile_number === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error={!signUpState.mobile_number}
          id="mobile_number_required"
        >
          required
        </FormHelperText>
      </FormControl>
      <div className="register-message">{message}</div>
      <div className="register-button">
        <Button type="submit" variant="contained" color="primary">
          REGISTER
        </Button>
      </div>
    </form>
  );
};

export default Register;
