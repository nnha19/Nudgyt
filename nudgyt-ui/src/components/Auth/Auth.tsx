import axios from "axios";
import React, { useEffect, useState } from "react";
import useAllValid from "../../customHooks/useAllValid";
import { validateForm } from "../../helperFunctions/validateForm";
import { IUser } from "../../types/types";
import Button from "../Common/Button/Button";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner";

import styles from "./Auth.module.css";
import Header from "./Header/Header";

export interface IInputVals {
  username?: { value: string; error: string | null; blurred: boolean };
  email: { value: string; error: string | null; blurred: boolean };
  password: { value: string; error: string | null; blurred: boolean };
  confirmPassword?: { value: string; error: string | null; blurred: boolean };
}

interface IProps {
  handleLogin: (userData: IUser) => void;
}

const Auth: React.FC<IProps> = ({ handleLogin }) => {
  const [inputVals, setInputVals] = useState<IInputVals>({
    email: {
      value: "",
      error: "required",
      blurred: false,
    },
    password: {
      value: "",
      error: "required",
      blurred: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const allValid = useAllValid(inputVals);
  const [authMode, setAuthMode] = useState<"sign in" | "sign up">("sign in");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    validRules: { type: string }
  ) => {
    const { name, value } = e.target;
    const error = validateForm(
      e,
      validRules,
      name === "confirmPassword" ? inputVals["password"].value : undefined
    );
    const updateInputVals = {
      ...inputVals,
      [name]: { ...inputVals[name as keyof IInputVals], value, error },
    };
    setInputVals(updateInputVals);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const updatedInputVals = {
      ...inputVals,
      [name]: { ...inputVals[name as keyof IInputVals], blurred: true },
    };
    setInputVals(updatedInputVals);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      let data;
      const {
        email: { value: email },
        password: { value: password },
      } = inputVals;

      if (authMode === "sign in") {
        data = { email, password };
      } else {
        data = { email, password, username: inputVals["username"]?.value };
      }
      const resp = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/${
          authMode === "sign up" ? "signup" : "login"
        }`,
        data,
      });
      handleLogin(resp.data);
    } catch (err: any) {
      // setError(err);
      setError(err?.response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let updatedInputVals;
    if (authMode === "sign in") {
      updatedInputVals = { ...inputVals };
      delete updatedInputVals["username"];
      delete updatedInputVals["confirmPassword"];
    } else {
      updatedInputVals = {
        ...inputVals,
        confirmPassword: {
          value: "",
          error: "required",
          blurred: false,
        },
        username: {
          value: "",
          error: "required",
          blurred: false,
        },
      };
    }
    for (let key in updatedInputVals) {
      updatedInputVals[key as keyof IInputVals] = {
        value: "",
        error: "This field is required",
        blurred: false,
      };
    }
    setInputVals(updatedInputVals);
    setError(undefined);
  }, [authMode]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={styles.auth}>
        <Header setAuthMode={setAuthMode} authMode={authMode} />
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorMsg}>{error}</p>}
          {authMode === "sign up" && (
            <div className={styles.inputContainer}>
              <input
                onBlur={handleBlur}
                type="text"
                placeholder="User Name"
                value={inputVals["username"]?.value}
                onChange={(e) => handleChange(e, { type: "REQUIRED" })}
                name="username"
              />
              {inputVals["username"]?.error &&
                inputVals["username"].blurred && (
                  <p className={styles.errorMsg}>
                    {inputVals["username"].error}
                  </p>
                )}
            </div>
          )}
          <div className={styles.inputContainer}>
            <input
              onBlur={handleBlur}
              type="email"
              placeholder="Email"
              value={inputVals["email"].value}
              onChange={(e) => handleChange(e, { type: "EMAIL" })}
              name="email"
            />
            {inputVals["email"].error && inputVals["email"].blurred && (
              <p className={styles.errorMsg}>{inputVals["email"].error}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              onBlur={handleBlur}
              type="password"
              placeholder="Password"
              value={inputVals["password"].value}
              onChange={(e) => handleChange(e, { type: "REQUIRED" })}
              name="password"
            />
            {inputVals["password"].error && inputVals["password"].blurred && (
              <p className={styles.errorMsg}>{inputVals["password"].error}</p>
            )}
          </div>
          {authMode === "sign up" && (
            <div className={styles.inputContainer}>
              <input
                onBlur={handleBlur}
                type="password"
                placeholder="Confirm Password"
                value={inputVals["confirmPassword"]?.value}
                onChange={(e) => handleChange(e, { type: "CONFIRM_PASSWORD" })}
                name="confirmPassword"
              />
              {inputVals["confirmPassword"]?.error &&
                inputVals["confirmPassword"].blurred && (
                  <p className={styles.errorMsg}>
                    {inputVals["confirmPassword"].error}
                  </p>
                )}
            </div>
          )}
          <Button
            disabled={!allValid}
            className={styles.btn}
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Auth;
