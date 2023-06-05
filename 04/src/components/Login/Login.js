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
import Input from "../UI/Input/Input";

const Login = (props) => {
  const ctx = useContext(AuthContext);
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
    if (formIsValid) {
      ctx.onLogin(emailState.isValid, passwordState.isValid);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <Input
            ref={emailInputRef}
            id="email"
            type="email"
            label="E-MAIL"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            ref={passwordInputRef}
            id="password"
            type="password"
            label="PASSWORD"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
