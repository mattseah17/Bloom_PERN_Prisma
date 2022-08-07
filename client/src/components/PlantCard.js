import React, { useState } from "react";
import UpdatePlantmodal from "./UpdatePlantmodal";

const PlantCard = (props) => {
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const handleAction = (e) => {
    setAction(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const showUpdateModal = () => {
    setShow(true);
  };

  const updatePlant = async (input) => {
    let result = await fetch(`http://localhost:5001/api/parent/registration`, {
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

  const deletePlant = () => {};

  return (
    <>
      <div>
        <div>
          <h2>{props.plantname}</h2>
        </div>
        <div>
          <p>{props.description}</p>
          <p>{props.type}</p>
          <p>{props.location}</p>
          <p>{props.waterFreq}</p>
          <p>{props.fertiliseFreq}</p>
          <p>{props.repotFreq}</p>
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
          onClick={updatePlant}
        />
      )}
    </>
  );
};

export default PlantCard;
