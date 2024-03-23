import React from "react";

const PopUp = (props) => {
  let Errer = ""
  if (props.age === "") {
    Errer = "Please enter a age first before submitting";
  }
  if (props.name.trim() === "") {
    Errer = "Please enter a name first before submitting";
  }
  if (props.age < 0) {
    Errer = "Please enter a valid age first before submitting";
  }
  return (
    <div>
      {props.PopErrer !== "" && (
        <div className="popup-container" onClick={() => props.state(false)}>
          <div>Invalid Input</div>
          <div>{Errer}</div>
          <div>
            <button className="button" onClick={() => props.state(false)}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
