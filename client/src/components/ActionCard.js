import React from "react";

const ActionCard = (props) => {
  const actionArray = props.actions.map((action) => {
    return (
      <>
        <div
          class="relative mt-3 mb-3 bg-yellow-100 opacity-75 border-solid border-black border-2 rounded"
          key={action.id}
          id={action.id}
        >
          <h4 class="absolute top-1 left-4 font-body text-xl mb-2">Action: </h4>
          <p class="absolute top-1 left-20 font-body text-xl mb-2">
            {action.type}
          </p>
          <h4 class="absolute top-1 right-20 mr-10 font-body text-xl mb-2">
            Action date:{" "}
          </h4>
          <p class="absolute top-1 right-5 font-body text-xl mb-2">
            {action.action_date}
          </p>
          <button
            class="font-body2 text-gray-100 bg-black border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ml-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-10"
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
