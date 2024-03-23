import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import InputBlock from "./InputBlock";

const Login = () => {
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    (state, action) => {
      if (action.type === "INPUT_EMAIL") {
        return { value: action.value, isValid: action.value.includes("@") };
      }
      if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
      }
      return { value: "", isValid: false };
    },
    {
      value: "",
      isValid: undefined,
    }
  );

  const [passwordState, dispatchPassword] = useReducer(
    (state, action) => {
      if (action.type === "INPUT_PASSWORD") {
        return { value: action.value, isValid: action.value.trim().length > 6 };
      }
      if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
      }
      return { value: "", isValud: false };
    },
    {
      value: "",
      isValid: undefined,
    }
  );

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT_EMAIL", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_PASSWORD", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!isEmailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputBlock
          ref={emailInputRef}
          name={"E-mail"}
          id={"e-mail"}
          type={"email"}
          clas={classes}
          ChangeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
          State={emailState}
        />
        <InputBlock
          ref={passwordInputRef}
          name={"Password"}
          id={"password"}
          type={"password"}
          clas={classes}
          ChangeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
          State={passwordState}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

// import React, { useEffect, useReducer, useContext, useRef } from "react";

// import Card from "../UI/Card/Card";
// import classes from "./Login.module.css";
// import Button from "../UI/Button/Button";
// import AuthContext from "../../store/auth-context";
// import InputBlock from "./InputBlock";

// const Login = () => {
//   const ctx = useContext(AuthContext);

//   // Whole form state
//   const [formValidity, formValidityDispatch] = useReducer(
//     (state, action) => {
//       if (action.EmailType === "INPUT_EMAIL") {
//         return {
//           EmailValue: action.EmailValue,
//           EmailValid: action.EmailValue.includes("@"),
//         };
//       }
//       if (action.EmailType === "INPUT_BLUR") {
//         return console.log(state.EmailValue)
//       }
//       if (action.PasswordType === "INPUT_PASSWORD") {
//         return {
//           PasswordValue: action.PasswordValue,
//           PasswordValid: action.PasswordValue.trim().length > 6,
//         };
//       }
//       if (action.PasswordType === "INPUT_BLUR") {
//         return {
//           PasswordValid: state.value.trim().length > 6,
//         };
//       }
//       if (state.EmailValid && state.PasswordValid) {
//         return { validity: true };
//       }

//       return { value: "", isValud: false };
//     },
//     {
//       EmailValue: "",
//       PasswordValue: "",
//       EmailValid: false,
//       PasswordValid: false,
//       IsFormValidity: false,
//     }
//   );

//   // handelers
//   const emailChangeHandler = (event) => {
//     formValidityDispatch({
//       EmailType: "INPUT_EMAIL",
//       EmailValue: event.target.value,
//     });
//   };

//   const validateEmailHandler = () => {
//     formValidityDispatch({ EmailType: "INPUT_BLUR" });
//   };

//   const passwordChangeHandler = (event) => {
//     formValidityDispatch({
//       PasswordType: "INPUT_PASSWORD",
//       PasswordValue: event.target.value,
//     });
//   };

//   const validatePasswordHandler = () => {
//     formValidityDispatch({ PasswordType: "INPUT_BLUR" });
//   };

//   const {
//     PasswordValue: passwordValue,
//     PasswordValid: passwordValid,
//     EmailValue: emailValue,
//     EmailValid: emailValid,
//     IsFormValidity: isFormValidity,
//   } = formValidity;

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (isFormValidity) {
//       ctx.onLogin(emailValue, passwordValue);
//     } else if (!emailValid) {
//       emailInputRef.current.focus();
//     } else {
//       passwordInputRef.current.focus();
//     }
//   };

//   useEffect(() => {
//     const identifier = setTimeout(() => {
//       formValidityDispatch({
//         IsFormValidity: emailValid && passwordValid,
//       });
//     }, 500);

//     return () => {
//       clearTimeout(identifier);
//     };
//   }, [emailValid, passwordValid]);

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <InputBlock
//           ref={emailInputRef}
//           name={"E-mail"}
//           id={"e-mail"}
//           type={"email"}
//           clas={classes}
//           value={emailValue}
//           ChangeHandler={emailChangeHandler}
//           validateHandler={validateEmailHandler}
//           State={emailValid}
//         />
//         <InputBlock
//           ref={passwordInputRef}
//           name={"Password"}
//           id={"password"}
//           type={"password"}
//           clas={classes}
//           value={passwordValue}
//           ChangeHandler={passwordChangeHandler}
//           validateHandler={validatePasswordHandler}
//           State={passwordValid}
//         />
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default Login;
