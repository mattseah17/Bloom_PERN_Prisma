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
      <div class="absolute top-40 right-80 w-1/3">
        <h1 class="font-body text-5xl mb-5">Add Action</h1>
        <div>
          <form onSubmit={handleAddAction}>
            <div>
              <label class="mt-10 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Action Type
              </label>
              <select
                class="rounded-lg"
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
            </div>
            <div>
              <label class="mt-5 font-body2 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
                Date
              </label>
              <input
                class="rounded-lg"
                type="date"
                value={date}
                onChange={(e) => {
                  handleDate(e);
                }}
                required
              />
            </div>
            <div>
              <button
                class="font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-4"
                type="submit"
              >
                Add action
              </button>
            </div>
          </form>
        </div>
        <div class="w-full">
          <ActionCard actions={actionArray} remove={removeAction} />
        </div>
      </div>
    </>
  );
};

export default PlantAction;
