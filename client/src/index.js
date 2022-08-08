import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SharedLayout from "./components/SharedLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./components/UserHome";
import AddPlant from "./pages/AddPlant";
import UpdateUser from "./pages/UpdateUser";
import PlantPage from "./components/PlantPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SharedLayout />}>
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/update" element={<UpdateUser />} />
            <Route path="/user/add" element={<AddPlant />} />
            <Route path="/plant/:id" element={<PlantPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
