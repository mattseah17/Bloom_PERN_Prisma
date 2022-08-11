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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Plant name{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Plant description{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Plant type{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Location{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Water Frequency{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Fertiliser Frequency{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div class="mb-5">
                <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                  Re-pot Frequency{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <button
                class="font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-8"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePlant;
