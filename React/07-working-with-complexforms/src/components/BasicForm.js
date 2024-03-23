import React, { useEffect, useState } from "react";
import useInput from "../hooks/form-hook";

const SimpleInput = (props) => {
  const {
    value: enteredSirName,
    isValid: enteredSirNameIsValid,
    hasError: sirNameInputHasError,
    valueChangeHandler: sirNameChangeHandler,
    inputBlurHandler: sirNameBlurHandler,
    reset: resetSirNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredSirNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredSirNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredEmailIsValid
    ) {
      return;
    } else {
      console.log(enteredSirName);
      console.log(enteredLastName);
      console.log(enteredEmail);

      // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
      resetSirNameInput();
      resetLastNameInput();
      resetEmailInput();
    }
  };

  const sirNameCalss = sirNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={sirNameCalss}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredSirName}
            onChange={sirNameChangeHandler}
            onBlur={sirNameBlurHandler}
          />
        </div>
        {sirNameInputHasError && (
          <p className="error-text">Please Enter The Sir Name First</p>
        )}
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
          />
        </div>
        {lastNameInputHasError && (
          <p className="error-text">Please Enter The Last Name First</p>
        )}
      </div>
      <div className={emailClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailInputHasError && (
        <p className="error-text">Please Enter The Email Name First</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
