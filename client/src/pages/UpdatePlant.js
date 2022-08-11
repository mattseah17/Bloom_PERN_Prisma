import React, { useEffect, useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePlant = () => {
  const [plantname, setPlantname] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [location, setLocation] = useState();
  const [waterFreq, setWaterfreq] = useState();
  const [fertiliseFreq, setFertilisefreq] = useState();
  const [repotFreq, setRepotfreq] = useState();
  const { id } = useParams();
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
      setPlantname(plantData.name);
      setDescription(plantData.description);
      setType(plantData.type);
      setLocation(plantData.location);
      setWaterfreq(plantData.water_freq);
      setFertilisefreq(plantData.fertilise_freq);
      setRepotfreq(plantData.repot_freq);
    };
    getPlant();
  }, [id, reactCtx.access]);

  const updatePlant = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:5002/plant/${id}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: plantname,
        description: description,
        type: type,
        location: location,
        water_freq: waterFreq,
        fertilise_freq: fertiliseFreq,
        repot_freq: repotFreq,
      }),
    });
    const data = await result.json();
    console.log(data);
    navigate(`/plant/${id}`);
    alert("Plant details updated");
  };

  return (
    <>
      <div class="absolute top-40 left-40">
        <h1 class="font-body text-5xl">Edit Plant Details</h1>
        <div>
          <form onSubmit={updatePlant}>
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
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePlant;
