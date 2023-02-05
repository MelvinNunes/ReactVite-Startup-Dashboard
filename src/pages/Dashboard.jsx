import React from "react";
import { Header } from "../components";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <div className="m-2 md:m-10 mt-20 p-2 bg-white rounded-3xl">
      <Helmet>
        <title>Kula | Dashboard</title>
      </Helmet>
      <Header category="Kula" title="Dashboard" />

    </div>
  );
};

export default Dashboard;
