import axios from "axios";
import React, { useEffect, useState } from "react";

import Home from "../components/Home/Home";
import { IUser, IUsers } from "../types/types";

interface IProps {
  userData: IUser;
}

const HomePage: React.FC<IProps> = ({ userData }) => {
  const [users, setUsers] = useState<IUsers["users"]>([] as IUsers["users"]);

  const { token, ...others } = userData;

  useEffect(() => {
    (async () => {
      const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setUsers(resp.data);
    })();
  }, []);

  return (
    <div>
      <Home users={users} userData={userData} />
    </div>
  );
};

export default HomePage;
