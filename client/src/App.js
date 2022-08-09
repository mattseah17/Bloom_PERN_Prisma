import "./App.css";
import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ReactContext from "./context/react-context";

const Landing = React.lazy(() => import("./pages/Landing"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const UserHome = React.lazy(() => import("./pages/UserHome"));
const UpdateUser = React.lazy(() => import("./pages/UpdateUser"));
const AddPlant = React.lazy(() => import("./pages/AddPlant"));
const PlantPage = React.lazy(() => import("./pages/PlantPage"));

function App() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [loginState, setLoginState] = useState(false);

  return (
    <>
      <ReactContext.Provider
        value={{
          access,
          setAccess,
          refresh,
          setRefresh,
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
                <Route path="/user" element={<UserHome />} />
                <Route path="/user/update" element={<UpdateUser />} />
                <Route path="/user/add" element={<AddPlant />} />
                <Route path="/plant/:id" element={<PlantPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ReactContext.Provider>
    </>
  );
}

export default App;
