import React from "react";

import styles from "./Header.module.css";

interface IProps {
  authMode: "sign in" | "sign up";
  setAuthMode: React.Dispatch<React.SetStateAction<"sign in" | "sign up">>;
}

const Header: React.FC<IProps> = ({ authMode, setAuthMode }) => {
  const handleHeaderChange = (type: "sign in" | "sign up") => {
    setAuthMode(type);
  };

  return (
    <div className={styles.headerContainer}>
      <h1
        onClick={() => handleHeaderChange("sign in")}
        className={authMode === "sign in" ? styles.activeHeader : ""}
      >
        Sign In
      </h1>
      <h1
        onClick={() => handleHeaderChange("sign up")}
        className={authMode === "sign up" ? styles.activeHeader : ""}
      >
        Sign Up
      </h1>
    </div>
  );
};

export default Header;
