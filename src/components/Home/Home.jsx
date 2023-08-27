import { Grid } from "@mui/material";
import React from "react";
import DashboardCard from "./DashboardCard";

const Home = ({ setActive }) => {
  const dashboardList = [
    {
      id: "1",
      title: "Invoices",
      desc: "Create invoices, download pdfs.",
      link: "invoices/",
    },
    {
      id: "2",
      title: "Fix Menus",
      desc: "Manage Fix Menus (Pickles, Snacks & Sweets)",
      link: "fix-menus/",
    },
    {
      id: "3",
      title: "Daily Menus",
      desc: "Manage Daily Menus (Tiffin, Catering)",
      link: "daily-menus/",
    },
    {
      id: "4",
      title: "Festive Menus",
      desc: "Manage Festive Menus",
      link: "festive-menus/",
    },
    {
      id: "5",
      title: "General Information",
      desc: "Manage General Information",
      link: "general-info/",
    },
    {
      id: "6",
      title: "Image Gallery",
      desc: "Create Image Links for Menu",
      link: "image-gallery/",
    },
  ];

  return (
    <div>
      <Grid
        container
        gap={2}
        style={{
          padding: "1rem .5rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        {dashboardList.map((card) => (
          <Grid item xs={12} md={5}>
            <DashboardCard data={card} setActive={setActive} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
