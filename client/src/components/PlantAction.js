import React, { useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import ActionCard from "./ActionCard";

const PlantAction = (props) => {
  const [actionType, setActionType] = useState("");
  const [date, setDate] = useState("");
  const [addedAction, setAddedAction] = useState("");
  const reactCtx = useContext(ReactContext);

  const handleActionType = (e) => {
    setActionType(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      type: actionType,
      action_date: date,
      plantId: props.plantId,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = `http://localhost:5002/plant/${props.plantId}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setAddedAction(result);
  };

  return (
    <>
      <div>
        <div>
          <h1>Add Action</h1>
        </div>
        <br />
        <div>
          <form onSubmit={handleSubmit}>
            <label>Action Type</label>
            <select
              name="level"
              value={actionType}
              onChange={(e) => {
                handleActionType(e);
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
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <ActionCard action={addedAction} />
      </div>
    </>
  );
};

export default PlantAction;
