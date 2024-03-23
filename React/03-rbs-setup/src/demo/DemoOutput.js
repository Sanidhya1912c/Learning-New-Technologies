import React from "react";

const DemoOutput = (props) => {
  return <p>{props.show ? "This is a new paragraph" : ""}</p>;
};

export default React.memo(DemoOutput);
