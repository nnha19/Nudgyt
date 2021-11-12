import React from "react";
import { IUser, IUsers } from "../../types/types";
import styles from "./Home.module.css";
interface IProps {
  users: IUsers["users"];
  userData: IUser;
}

const Home: React.FC<IProps> = ({ users, userData }) => {
  const usersList = users.map((user) => {
    return (
      <div className={styles.user} key={user._id}>
        <span>{user.username[0]}</span>
        <div>
          <h4>
            {user.username}
            {user._id === userData._id && " (You)"}
          </h4>
          <p>{user.email}</p>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.home}>
      <h1>Users</h1>
      {usersList}
    </div>
  );
};

export default Home;
