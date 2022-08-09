import React, { useEffect, useState } from "react";
import UpdatePlantmodal from "../components/UpdatePlantmodal";
import { useParams, useNavigate } from "react-router-dom";
import ActionCard from "../components/ActionCard";

const PlantPage = () => {
  const [show, setShow] = useState(false);
  const [plant, setPlant] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const showUpdateModal = () => {
    setShow(true);
  };

  useEffect(() => {
    const getPlant = async () => {
      const plantApi = `http://localhost:5002/plant/${id}`;
      const res = await fetch(plantApi, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer`, //token,
        },
        method: "GET",
      });
      const plantData = await res.json();
      setPlant(plantData);
    };
    getPlant();
  }, []);

  const updatePlant = async (input) => {
    let result = await fetch(`http://localhost:5002/plant/${input.id}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer`, //token,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: input.plantname,
        description: input.description,
        type: input.type,
        location: input.location,
        water_freq: input.waterFreq,
        fertilise_freq: input.fertiliseFreq,
        repot_freq: input.repotFreq,
      }),
    });
    const data = await result.json();
    console.log(data);
    setShow(false);
  };

  const deletePlant = async () => {
    const res = await fetch(`http://localhost:5002/plant/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer`, //token,
      },
    });
    const deletedPlant = await res.json();
    alert(`${deletedPlant.name} is removed`);
    navigate("/user");
  };

  return (
    <>
      <div>
        <div>
          <h2>{plant.plantname}</h2>
        </div>
        <div>
          <p>{plant.description}</p>
          <p>{plant.type}</p>
          <p>{plant.location}</p>
          <p>{plant.waterFreq}</p>
          <p>{plant.fertiliseFreq}</p>
          <p>{plant.repotFreq}</p>
        </div>
        <div>
          <button
            onClick={() => {
              showUpdateModal();
            }}
          >
            Edit
          </button>
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
      <ActionCard />
      {show && (
        <UpdatePlantmodal
          title="Update Plant Details"
          show={show}
          onClick={() => {
            updatePlant(plant);
          }}
        />
      )}
    </>
  );
};

export default PlantPage;
