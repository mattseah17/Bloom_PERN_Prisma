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
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 duration-300 inline-block w-1/4 h-1/5 mt-7 mb-3 ml-5 mr-5 cursor-pointer"
          onClick={() => {
            fetchPlant(d.id);
          }}
        >
          <div id={d.id} key={d.id}>
            <img src={d.image} alt="plant_image" />
          </div>
          <div>
            <h5 class="text-lg text-gray-700 font-body mb-2 mt-2 text-center">
              {d.name}
            </h5>
          </div>
        </div>
      </>
    );
  });

  return <div>{plants}</div>;
};

export default PlantArray;
