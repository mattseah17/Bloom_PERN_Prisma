import React, { useEffect, useState } from "react";
import UpdatePlantmodal from "./UpdatePlantmodal";
import { useParams } from "react-router-dom";

const PlantCard = () => {
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [plant, setPlant] = useState("");
  const { id } = useParams();

  const handleAction = (e) => {
    setAction(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const showUpdateModal = () => {
    setShow(true);
  };

  const getPlant = async () => {
    const plantApi = `http://localhost:5002/plant/${id}`;
    const res = await fetch(plantApi);
    const plantData = await res.json();
    setPlant(plantData);
  };

  useEffect(() => {
    getPlant();
  }, []);

  const updatePlant = async (input) => {
    let result = await fetch(`http://localhost:5002/plant/${input.id}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer ", //+ ,
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
        Authorization: "Bearer ", //+ ,
      },
    });
    const jobs = await res.json();
    return jobs;
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
          <button onClick={showUpdateModal}>Edit</button>
        </div>
        <div>
          <button onClick={deletePlant}>Delete</button>
        </div>
      </div>
      <div>
        <h1>Add Action</h1>
        <br />
        <form>
          <label>Action Type</label>
          <select
            name="level"
            value={action}
            onChange={(e) => {
              handleAction(e);
            }}
            required
          >
            <option value="null"> </option>
            <option value="water">Water</option>
            <option value="fertilise">Fertilise</option>
            <option value="repot">Re-pot</option>
          </select>
          <br />
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              handleDate(e);
            }}
            required
          />
        </form>
      </div>
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

export default PlantCard;
