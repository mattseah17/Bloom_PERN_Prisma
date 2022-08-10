import React, { useState, useEffect, useContext } from "react";
import ReactContext from "../context/reactcontext";
import ActionCard from "./ActionCard";

const PlantAction = (props) => {
  const [actionType, setActionType] = useState("");
  const [date, setDate] = useState("");
  const [addedAction, setAddedAction] = useState("");
  const [actionArray, setActionArray] = useState([]);
  const reactCtx = useContext(ReactContext);

  const handleActionType = (e) => {
    setActionType(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const getActionArray = async () => {
      const actionApi = `http://localhost:5002/plant/action/${props.plantId}`;
      const res = await fetch(actionApi, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${reactCtx.access}`,
        },
        method: "GET",
      });
      const plantActions = await res.json();
      setActionArray(plantActions);
    };
    getActionArray();
  }, [actionArray]);

  const handleSubmitAction = async (e) => {
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
    alert(`${addedAction.type} action was added`);
  };

  return (
    <>
      <div>
        <div>
          <h1>Add Action</h1>
        </div>
        <br />
        <div>
          <form onSubmit={handleSubmitAction}>
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
              <button type="submit">Add action</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <ActionCard actions={actionArray} actionId={addedAction.id}/>
      </div>
    </>
  );
};

export default PlantAction;
