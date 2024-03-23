import React, { useRef, useImperativeHandle } from "react";

const InputBlock = React.forwardRef((props, ref) => {

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });


  return (
    <div
      className={`${props.clas.control} ${
        props.State === false ? props.clas.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.ChangeHandler}
        onBlur={props.validateHandler}
      />
    </div>
  );
});

export default InputBlock;
