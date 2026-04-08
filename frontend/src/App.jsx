import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./usercontext/UserContext";

import Dashboard from "./pages/Dashboard";
import Acknowledge from "./pages/Acknowledge";
import Familyrecords from "./pages/Familyrecords";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Manual from "./pages/Manual";

export default function App() {

  const [data, setdata] = useState([]);
  const [reports, setreports] = useState([]);

  return (
    <UserContext.Provider value={{ data, setdata, reports, setreports }}>
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="manual" element={<Manual/>}/>
            <Route path="acknowledge" element={<Acknowledge />} />
            <Route path="records" element={<Familyrecords />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </UserContext.Provider>
  );
}