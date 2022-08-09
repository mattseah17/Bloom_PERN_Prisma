import "./App.css";
import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ReactContext from "./context/reactcontext";

const Landing = React.lazy(() => import("./pages/Landing"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const UserHome = React.lazy(() => import("./pages/UserHome"));
const UpdateUser = React.lazy(() => import("./pages/UpdateUser"));
const AddPlant = React.lazy(() => import("./pages/AddPlant"));
const PlantPage = React.lazy(() => import("./pages/PlantPage"));
const UpdatePlant = React.lazy(() => import("./pages/UpdatePlant"));

function App() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [id, setId] = useState("");
  const [loginState, setLoginState] = useState(false);

  return (
    <>
      <ReactContext.Provider
        value={{
          access,
          setAccess,
          refresh,
          setRefresh,
          loginEmail,
          setLoginEmail,
          id,
          setId,
          loginState,
          setLoginState,
        }}
      >
        <div>
          <main>
            <Suspense fallback={<p>Loading...</p>}>
              <NavBar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/update" element={<UpdateUser />} />
                <Route path="/add" element={<AddPlant />} />
                <Route path="/plant/:id" element={<PlantPage />} />
                <Route path="/update/:id" element={<UpdatePlant />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ReactContext.Provider>
    </>
  );
}

export default App;
