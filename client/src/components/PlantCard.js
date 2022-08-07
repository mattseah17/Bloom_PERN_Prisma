import React, { useState } from "react";

const PlantCard = (props) => {
  const [plantname, setPlantname] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [type, setType] = useState(props.type);
  const [location, setLocation] = useState(props.location);
  const [waterFreq, setWaterfreq] = useState(props.water_freq);
  const [fertiliseFreq, setFertilisefreq] = useState(props.fertilise_freq);
  const [repotFreq, setRepotfreq] = useState(props.repot_freq);
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const [update, setUpdate] = useState(false);

  const handleAction = (e) => {
    setAction(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const updatePlantForm = () => {
    setUpdate(true);
  };

  const editPlant = () => {
    setUpdate(false);
  };

  const deletePlant = () => {};

  return (
    <>
      <div>
        <div>
          <h2>{plantname}</h2>
        </div>
        <div>
          <p>{description}</p>
          <p>{type}</p>
          <p>{location}</p>
          <p>{waterFreq}</p>
          <p>{fertiliseFreq}</p>
          <p>{repotFreq}</p>
        </div>
        <div>
          <button onClick={updatePlantForm}>Edit</button>
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
    </>
  );
};

export default PlantCard;
