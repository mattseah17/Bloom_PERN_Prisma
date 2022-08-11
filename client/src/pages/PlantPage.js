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
    console.log(deletedPlant);
    navigate("/home");
  };

  return (
    <>
      <div class="absolute top-40 left-40" id={id}>
        <div>
          <h2 class="font-body text-5xl mb-5">{plant.name}</h2>
        </div>
        <div>
          <img class="rounded-md w-1/2" src={plant.image} alt="plant_image" />
        </div>
        <div class="mt-1">
          <p class="font-body2 text-lg">Description: {plant.description}</p>
          <p class="font-body2 text-lg">Type: {plant.type}</p>
          <p class="font-body2 text-lg">Location: {plant.location}</p>
          <p class="font-body2 text-lg">Water frequency: {plant.water_req}</p>
          <p class="font-body2 text-lg">
            Fertilise frequency: {plant.fertilise_freq}
          </p>
          <p class="font-body2 text-lg">Re-pot frequency: {plant.repot_freq}</p>
        </div>
        <button
          class="inline font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-1"
          onClick={goUpdatePlantPage}
        >
          Edit
        </button>
        <button
          class="inline font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-1"
          onClick={() => {
            deletePlant();
          }}
        >
          Delete
        </button>
      </div>
      <PlantAction plantId={id} />
    </>
  );
};

export default PlantPage;
