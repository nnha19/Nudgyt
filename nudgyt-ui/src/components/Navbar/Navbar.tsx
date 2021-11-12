import React from "react";

import styles from "./Navbar.module.css";

import { IUser } from "../../types/types";
import Button from "../Common/Button/Button";

interface IProps {
  user: IUser | undefined;
  handleLogout: () => void;
}

const Navbar: React.FC<IProps> = ({ user, handleLogout }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img
          className={styles.logoImg}
          src="https://static.wixstatic.com/media/f3daa1_f5b1fda7563141ca916a3fa551142e7f~mv2.png/v1/fill/w_100,h_100,al_c,q_85,usm_0.66_1.00_0.01/n-white.webp"
        />
        <div className={styles.logoBody}>
          <h1>Nudgyt</h1>
          <p>Nudging Analytics into Action</p>
        </div>
      </div>
      {user && <Button clicked={handleLogout}>Sign Out</Button>}
    </nav>
  );
};

export default Navbar;
