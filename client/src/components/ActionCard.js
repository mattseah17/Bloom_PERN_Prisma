import React from "react";

const ActionCard = (props) => {
  
  const actionArray = props.actions.map((action) => {
    return (
      <>
        <div key={action.id} id={action.id}>
          <h4>Action: </h4>
          <p>{action.type}</p>
          <h4>Action date: </h4>
          <p>{action.action_date}</p>
          <button type="button" onClick={() => props.remove(action.id)}>
            Remove
          </button>
        </div>
      </>
    );
  });

  return <div>{actionArray}</div>;
};

export default ActionCard;
