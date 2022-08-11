import React from "react";

const ActionCard = (props) => {
  const actionArray = props.actions.map((action) => {
    return (
      <>
        <div class="border-solid border-black border-2 rounded" key={action.id} id={action.id}>
          <h4 class="font-body text-xl mb-5">Action: </h4>
          <p>{action.type}</p>
          <h4 class="inline font-body text-xl mb-5">Action date: </h4>
          <p>{action.action_date}</p>
          <button
            class="font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-4"
            type="button"
            onClick={() => props.remove(action.id)}
          >
            Remove
          </button>
        </div>
      </>
    );
  });

  return <div>{actionArray}</div>;
};

export default ActionCard;
