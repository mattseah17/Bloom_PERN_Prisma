import "./App.css";
import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserContext from "./hooks/UserContext";

const LandingPage = React.lazy(() => import("./components/Landing"));
const Homepage = React.lazy(() => import("./components/UserHome"));
const AddPlant = React.lazy(() => import("./components/AddPlant"));
const UpdateUser = React.lazy(() => import("./components/UpdateUser"));
const PlantCard = React.lazy(() => import("./components/PlantCard"));

function App() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");

  return (
    <>
      <UserContext.Provider value={{ access, setAccess, refresh, setRefresh }}>
        <div>
          <main>
            <Suspense fallback={<p>Loading...</p>}>
              <NavBar />
              <Routes>
                <Route path="/" element={<Navigate replace to="/landing" />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/user" element={<Homepage />} />
                <Route path="/user/add" element={<AddPlant />} />
                <Route path="/user/update" element={<UpdateUser />} />
                <Route path="/plant/:id" element={<PlantCard />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
