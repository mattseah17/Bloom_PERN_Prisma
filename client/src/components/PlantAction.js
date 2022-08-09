import React, { useState } from "react";

const PlantAction = () => {
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");

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

export default PlantAction;
