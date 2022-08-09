import React, { useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import ActionCard from "./ActionCard";

const PlantAction = (props) => {
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const reactCtx = useContext(ReactContext);
  
  const handleAction = (e) => {
    setAction(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          <h1>Add Action</h1>
        </div>
        <br />
        <div>
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
      </div>
      <div>
        <ActionCard />
      </div>
    </>
  );
};

export default PlantAction;
