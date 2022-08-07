import React from "react";

const PlantCards = (props) => {
  const plants = props.data.map((d) => {
    return (
      <>
        <div>
          <div id={d.id} key={d.id}>
            {/* <img src={d.image} alt="" /> */}
          </div>
          <div>
            <h5>{d.name}</h5>
          </div>
        </div>
      </>
    );
  });

  return <div>{plants}</div>;
};

export default PlantCards;
