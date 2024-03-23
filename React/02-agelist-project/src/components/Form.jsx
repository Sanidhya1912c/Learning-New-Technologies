import React from "react";
import { useState, useRef } from "react";
import PopUp from "./PopUp";

const Form = (props) => {
  const [popState, setPopState] = useState(false);
  const name = useRef("");
  const age = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (name.current.value.trim() === "" || age.current.value < 0 || age.current.value === "") {
      return setPopState(true);
    }
    popState && setPopState(false);
    const userData = {
      id: Math.random().toString(),
      name: name.current.value,
      age: age.current.value,
    };
    props.onAddUser(userData);
    name.current.value = ""
    age.current.value = ""
  };

  return (
    <form onSubmit={submitHandler} className="form-container">
      <div>
        <label htmlFor="" className="lable">
          Name:
        </label>
        <input type="text" className="input" ref={name} />
      </div>
      <div>
        <label htmlFor="" className="lable">
          Age:
        </label>
        <input type="number" className="input" ref={age} />
      </div>
      <div>
        <button className="button">Add User</button>
      </div>
      {popState && <PopUp state={(e) => setPopState(e)} name={name.current.value} age={age.current.value} />}
    </form>
  );
};

export default Form;
