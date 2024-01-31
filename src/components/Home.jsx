import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>this is Home {user?.email}</h1>
      {/* <h2>Name: {displayName}</h2> */}
      {/* <h2>Email: {email}</h2> */}
    </div>
  );
};

export default Home;
