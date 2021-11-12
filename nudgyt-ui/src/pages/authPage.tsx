import React from "react";
import Auth from "../components/Auth/Auth";
import { IUser } from "../types/types";

interface IProps {
  handleLogin: (userData: IUser) => void;
}

const AuthPage: React.FC<IProps> = ({ handleLogin }) => {
  return (
    <div>
      <Auth handleLogin={handleLogin} />
    </div>
  );
};

export default Auth;
