import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { TeamDataProvider } from "./page-components/team/teamContext.js";
import "./App.css";

import {
  Home,
  About,
  Team,
  Events,
  FAQ,
  AdminAbout,
  AdminEvents,
  AdminFaq,
  AdminTeam,
  AdminHome,
  AdminLogin,
  AdminDashboard,
  AdminDoc,
  MissingPage
} from "./page-components/imports.js";

import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route element={<MainLayout/>}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<TeamDataProvider><Team /></TeamDataProvider>} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pages/home" element={<AdminHome />} />
        <Route path="/admin/pages/events" element={<AdminEvents />} />
        <Route path="/admin/pages/faq" element={<AdminFaq />} />
        <Route path="/admin/pages/team" element={<AdminTeam />} />
        <Route path="/admin/pages/about" element={<AdminAbout />} />
        <Route path="/admin/doc" element={<AdminDoc />} />
        <Route path="/*" element={<MissingPage />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
