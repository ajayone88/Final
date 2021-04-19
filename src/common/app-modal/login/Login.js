import React, { useState } from "react";
import "./Login.css";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
} from "@material-ui/core";
import serviceApi from "../../../service/serviceApi";

const Login = ({ loginState }) => {
  const [, setLoginState] = loginState;
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * @name submitHandler
   * @description It is used to make login service call on submitting the login credentials. 
   * @param {*} event 
   * @param {*} type 
   */
  const submitHandler = (event, type) => {
    event.preventDefault();
    const keys = Object.keys(loginData);
    const isFromInvalid = keys.some((key) => loginData[key] === "");
    if (!isFromInvalid) {
      serviceApi()
        .login(loginData)
        .then((res) => {
          window.sessionStorage.setItem(
            "access-token",
            res.headers.get("access-token")
          );
          return res.json();
        })
        .then((data) => {
          if (data.status === "ACTIVE") {
            window.sessionStorage.setItem("user-data", JSON.stringify(data));
            setLoginState(true);
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
    <form className="login" onSubmit={(event) => submitHandler(event, "Login")}>
      {/**
       * It consists to two FormControl for username and password
       */}
      <FormControl>
        <InputLabel htmlFor="username">Username *</InputLabel>
        <Input
          id="username"
          type="text"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
          aria-describedby="username-required"
        />
        <FormHelperText
          style={
            loginData.username === "" && touched
              ? { display: "block" }
              : { display: "none" }
          }
          error
          id="username-required"
        >
          required
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="loginPassword">Password*</InputLabel>
        <Input
          id="password"
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          aria-describedby="password-required"
        />
      </FormControl>
      <FormHelperText
        style={
          loginData.password === "" && touched
            ? { display: "block" }
            : { display: "none" }
        }
        error
        id="password-required"
      >
        required
      </FormHelperText>
      <div className="login-message">{message}</div>
      <div className="login-button">
        <Button type="submit" variant="contained" color="primary">
          LOGIN
        </Button>
      </div>
    </form>
  );
};

export default Login;
