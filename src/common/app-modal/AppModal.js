import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./AppModal.css";
import Login from "./login/Login";
import Register from "./register/Register";

const customStyles = {
  content: {
    height: "fit-content",
    width: "350px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

/**
 * @name TabPanel
 * @description It is used to display tabpanel when user switches the tab.
 * @param {*}, loginState, value, index
 * @returns newly created TabPanel
 */
const TabPanel = ({ loginState, value, index }) => {
  const login = <Login loginState={loginState} />;
  const register = <Register />;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === 0 ? login : register}
    </div>
  );
};

const AppModal = ({ loginState, modalState }) => {
  const [currentModalState, setModalState] = modalState;
  useEffect(() => {
    setModalState(currentModalState);
  }, [currentModalState]);

  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  /**
   * @name a11yProps
   * @description It has the logic of returning the selected tab properties.
   * @param {*} index 
   * @returns the properties
   */
  const a11yProps = (index) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  };
  return (
    <Modal
      isOpen={currentModalState}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setModalState(false)}
      contentLabel="Login/Register"
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable auto tabs Login/Register"
        variant="fullWidth"
        centered
      >
        <Tab label="LOGIN" {...a11yProps(0)} />
        <Tab label="REGISTER" {...a11yProps(1)} />
      </Tabs>
      <TabPanel loginState={loginState} value={tab} index={0}></TabPanel>
      <TabPanel loginState={loginState} value={tab} index={1}></TabPanel>
    </Modal>
  );
};

export default AppModal;
