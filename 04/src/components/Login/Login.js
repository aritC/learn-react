import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const inputReducer = (lastState, action) => {
    if (action.type === "EMAIL_INPUT") {
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    }
    if (action.type === "EMAIL_BLUR") {
      return {
        value: lastState.value,
        isValid: lastState.value.includes("@"),
      };
    }
    if (action.type === "PASSWORD_INPUT") {
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    }
    if (action.type === "PASSWORD_BLUR") {
      return {
        value: lastState.value,
        isValid: lastState.value.trim().length > 6,
      };
    }
    return {
      value: "",
      isValid: null,
    };
  };

  const [emailState, dispatchEmail] = useReducer(inputReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(inputReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timerRef = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 150);

    return () => {
      clearTimeout(timerRef);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "EMAIL_INPUT",
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "PASSWORD_INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "EMAIL_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "PASSWORD_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.isValid, passwordState.isValid);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            autoComplete="username"
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            autoComplete="current-password"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
