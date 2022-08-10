import React, { useContext } from "react";
import ReactContext from "../context/reactcontext";

const ActionCard = ({ actions, actionId }) => {
  const reactCtx = useContext(ReactContext);

  const removeAction = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5002/plant/action/${actionId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${reactCtx.access}`,
      },
    });
    const deletedAction = await res.json();
    alert(`${deletedAction.type} action is removed`);
  };

  const actionArray = actions.map((action) => {
    return (
      <>
        <div id={action.id}>
          <h4>Action: </h4>
          <p>{action.type}</p>
          <h4>Action date: </h4>
          <p>{action.action_date}</p>
          <button type="button" onClick={removeAction}>
            Remove
          </button>
        </div>
      </>
    );
  });
  return <div>{actionArray}</div>;
};

export default ActionCard;
