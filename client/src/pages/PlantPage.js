import React, { useEffect, useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import { useParams, useNavigate } from "react-router-dom";
import PlantAction from "../components/PlantAction";

const PlantPage = () => {
  const [plant, setPlant] = useState("");
  const { id } = useParams();
  const reactCtx = useContext(ReactContext);
  const navigate = useNavigate();

  const goUpdatePlantPage = () => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    const getPlant = async () => {
      const plantApi = `http://localhost:5002/plant/${id}`;
      const res = await fetch(plantApi, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${reactCtx.access}`,
        },
        method: "GET",
      });
      const plantData = await res.json();
      setPlant(plantData);
    };
    getPlant();
  }, [id, reactCtx.access]);

  const deletePlant = async () => {
    const res = await fetch(`http://localhost:5002/plant/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
    });
    const deletedPlant = await res.json();
    alert(`${deletedPlant.name} is removed`);
    navigate("/home");
  };

  return (
    <>
      <div id={id}>
        <div>
          <h2>{plant.name}</h2>
        </div>
        <div>
          <p>{plant.description}</p>
          <p>{plant.type}</p>
          <p>{plant.location}</p>
          <p>{plant.water_req}</p>
          <p>{plant.fertilise_freq}</p>
          <p>{plant.repot_freq}</p>
        </div>
        <div>
          <button onClick={goUpdatePlantPage}>Edit</button>
        </div>
        <div>
          <button
            onClick={() => {
              deletePlant();
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <PlantAction />
    </>
  );
};

export default PlantPage;
