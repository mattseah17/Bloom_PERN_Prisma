import React, { useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import ActionCard from "./ActionCard";

const PlantAction = (props) => {
  const [actionType, setActionType] = useState("");
  const [date, setDate] = useState("");

  const [actionArray, setActionArray] = useState([]);
  const reactCtx = useContext(ReactContext);

  const handleActionType = (e) => {
    setActionType(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  // const [isNotLoading, setIsNotLoading] = useState(false);

  // const getActionArray = async () => {
  //   console.log(`calling getActionArray`);

  //   const actionApi = `http://localhost:5002/plant/action/${props.plantId}`;
  //   const res = await fetch(actionApi, {
  //     headers: {
  //       "Content-Type": "Application/json",
  //       Authorization: `Bearer ${reactCtx.access}`,
  //     },
  //     method: "GET",
  //   });
  //   const plantActions = await res.json();
  //   console.log(plantActions);
  //   setActionArray(plantActions);

  //   setIsNotLoading(true);
  // };

  // useEffect(() => {
  //   console.log(`component is mounted`);
  //   getActionArray();
  // }, [addedActionId]);

  const handleAddAction = async (e) => {
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
    console.log(result);
    setActionArray([...actionArray, result]);
  };

  const removeAction = async (actionId) => {
    // e.preventDefault();
    const res = await fetch(`http://localhost:5002/plant/action/${actionId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
    });
    const deletedAction = await res.json();
    const actionArr = actionArray.filter((action) => action.id !== actionId);
    setActionArray(actionArr);
    alert(`${deletedAction.type} action is removed`);
  };

  return (
    <>
      <div>
        <div>
          <h1>Add Action</h1>
        </div>
        <br />
        <div>
          <form onSubmit={handleAddAction}>
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
        <ActionCard actions={actionArray} remove={removeAction} />
      </div>
    </>
  );
};

export default PlantAction;
