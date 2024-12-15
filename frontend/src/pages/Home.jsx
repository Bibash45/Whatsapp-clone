import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user); // Access user data from the store
  console.log(user);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
