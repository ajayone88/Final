import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Button } from "@material-ui/core";
import AppModal from "../../common/app-modal/AppModal";
import serviceApi from "../../service/serviceApi";

const Header = (props) => {
  const modalState = useState(false);
  const [currentLoginState, setLoginState] = props.loginState;
  const [, setModalState] = modalState;
  /**
   * @name useEffect
   * @description It is used to make modal close once user is logged in.
   */
  useEffect(() => {
    if (currentLoginState === true) {
      setModalState(false);
    }
  }, [currentLoginState]);

  /**
   * @name logoutHandler
   * @description It is used to handle the logout request, 
   * It makes a service call for logout.
   * After service call it clear the data from sessionStorage.
   */
  const logoutHandler = () => {
    const accessToken = window.sessionStorage.getItem("access-token");
    serviceApi()
      .logout(accessToken)
      .then((res) => {
        if (res.ok) {
          window.sessionStorage.removeItem('user-data');
          window.sessionStorage.removeItem('access-token');
          setLoginState(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  /**
   * @name bookShowHandler
   * @description It is used to check if user is logged in,
   * if yes then redirect make call for onClickBookshowHandler
   * if No then open the modal
   */
  const bookShowHandler = () => {
    if (currentLoginState === true) {
      props.onClickBookshowHandler();
    } else {
      setModalState(true);
    }
  };
  return (
    <div className="header">
      <AppModal loginState={props.loginState} modalState={modalState} />
      <div>
        <img className="logo" src={logo} alt="logo-img"></img>
      </div>
      <div>
        {props.bookshow === true ? (
          <Button
            style={{ marginRight: 8 }}
            variant="contained"
            color="primary"
            onClick={bookShowHandler}
          >
            Book Show
          </Button>
        ) : null}
        {currentLoginState === true ? (
          <Button variant="contained" color="default" onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
            onClick={() => setModalState(true)}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
