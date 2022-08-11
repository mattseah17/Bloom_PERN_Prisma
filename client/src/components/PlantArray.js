import React from "react";
import { useNavigate } from "react-router-dom";

const PlantArray = (props) => {
  const navigate = useNavigate();

  const fetchPlant = (plantId) => {
    navigate(`/plant/${plantId}`);
  };

  const plants = props.data.map((d) => {
    return (
      <>
        <div
          onClick={() => {
            fetchPlant(d.id);
          }}
        >
          <div id={d.id} key={d.id}>
            <img src={d.image} alt="plant_image" />
          </div>
          <div>
            <h5>{d.name}</h5>
          </div>
        </div>
      </>
    );
  });

  return <div>{plants}</div>;
};

export default PlantArray;
