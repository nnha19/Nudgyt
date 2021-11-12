import React from "react";
import styles from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={styles.backdrop}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default LoadingSpinner;
