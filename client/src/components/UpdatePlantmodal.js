import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  const [plantname, setPlantname] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [waterFreq, setWaterfreq] = useState("");
  const [fertiliseFreq, setFertilisefreq] = useState("");
  const [repotFreq, setRepotfreq] = useState("");

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

  const getPlantDetails = async () => {
    let result = await fetch(`http://localhost:5001/parent/registration`);
    console.log(result);
    result = await result.json();
    setPlantname(result.name);
    setDescription(result.description);
    setType(result.type);
    setLocation(result.location);
    setWaterfreq(result.water_freq);
    setFertilisefreq(result.fertilise_freq);
    setRepotfreq(result.repot_freq);
  };

  useEffect(() => {
    getPlantDetails();
  }, []);

  const updatedDetails = {
    plantname,
    description,
    type,
    location,
    waterFreq,
    fertiliseFreq,
    repotFreq,
  };

  return (
    <div className={styles.backdrop} onClick={props.onClick}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <form
            onSubmit={() => {
              props.onClick(updatedDetails);
            }}
          >
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UpdatePlantmodal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay title={props.title} onClick={props.onClick} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdatePlantmodal;