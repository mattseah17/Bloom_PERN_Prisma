import React, { useEffect, useState } from "react";
import PlantCards from "./Results";

const Userhome = () => {
  const [plantsList, setPlantsList] = useState([]);

  const plantList = async () => {
    const plantApi = `http://localhost:5002/plant/myList`;
    const res = await fetch(plantApi);
    const plantsData = await res.json();
    setPlantsList(plantsData);
  };

  useEffect(() => {
    plantList();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>My Dashboard</h1>
        </div>
        {plantsList.length === 0 ? (
          <h2>You have not added any plants</h2>
        ) : (
          <div>
            <PlantCards data={plantsList} />
          </div>
        )}
      </div>
    </>
  );
};

export default Userhome;
