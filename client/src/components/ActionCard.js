import React from "react";

const ActionCard = (props) => {
  const removeAction = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <div>
        <h4>Action: </h4>
        <p>{props.type}</p>
        <h4>Action date: </h4>
        <p>{props.action_date}</p>
        <button type="button" onClick={removeAction}>
          Remove
        </button>
      </div>
    </>
  );
};

export default ActionCard;
