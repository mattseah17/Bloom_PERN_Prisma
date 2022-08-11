import React, { useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import { useNavigate } from "react-router-dom";

const AddPlant = () => {
  const [plantname, setPlantname] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [waterFreq, setWaterfreq] = useState("");
  const [fertiliseFreq, setFertilisefreq] = useState("");
  const [repotFreq, setRepotfreq] = useState("");
  const [image, setImage] = useState("");

  const reactCtx = useContext(ReactContext);
  const navigate = useNavigate();

  const handlePlantName = (e) => {
    setPlantname(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleWater = (e) => {
    setWaterfreq(e.target.value);
  };
  const handleFertiliser = (e) => {
    setFertilisefreq(e.target.value);
  };
  const handleRepot = (e) => {
    setRepotfreq(e.target.value);
  };
  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: plantname,
      description: description,
      type: type,
      location: location,
      water_freq: waterFreq,
      fertilise_freq: fertiliseFreq,
      repot_freq: repotFreq,
      image: image,
      userId: reactCtx.id,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:5002/plant/create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    alert("Plant added!");
    navigate("/home");
  };

  return (
    <>
      <div>
        <h1>Add A New Plant</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label>Plant name </label>
              <input
                id="plantname"
                name="plantname"
                onChange={(e) => {
                  handlePlantName(e);
                }}
                type="text"
                placeholder="Plant name"
                value={plantname}
                required
              />
            </div>
            <div>
              <label>Plant description </label>
              <input
                id="description"
                name="description"
                onChange={(e) => {
                  handleDescription(e);
                }}
                type="text"
                placeholder="Description"
                value={description}
              />
            </div>
            <div>
              <label>Plant type </label>
              <input
                id="type"
                name="type"
                onChange={(e) => {
                  handleType(e);
                }}
                type="text"
                placeholder="Type"
                value={type}
              />
            </div>
            <div>
              <label>Location </label>
              <input
                id="location"
                name="location"
                onChange={(e) => {
                  handleLocation(e);
                }}
                type="text"
                placeholder="Where it grows best"
                value={location}
              />
            </div>
            <div>
              <label>Water Frequency </label>
              <input
                id="waterFreq"
                name="waterFreq"
                onChange={(e) => {
                  handleWater(e);
                }}
                type="text"
                placeholder="How often does it need to be watered?"
                value={waterFreq}
              />
            </div>
            <div>
              <label>Fertiliser Frequency </label>
              <input
                id="fertiliseFreq"
                name="fertiliseFreq"
                onChange={(e) => {
                  handleFertiliser(e);
                }}
                type="text"
                placeholder="How often does ferilisers need to be added?"
                value={fertiliseFreq}
              />
            </div>
            <div>
              <label>Re-pot Frequency </label>
              <input
                id="repotFreq"
                name="repotFreq"
                onChange={(e) => {
                  handleRepot(e);
                }}
                type="text"
                placeholder="How often does it need to be re-potted?"
                value={repotFreq}
              />
            </div>
            <div>
              <label>Image </label>
              <input
                id="image"
                name="image"
                onChange={(e) => {
                  handleImage(e);
                }}
                type="text"
                placeholder="Any image?"
                value={image}
              />
            </div>
            <button>Add plant</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPlant;
