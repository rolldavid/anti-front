import { connect } from "react-redux";
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { setUserId } from "../../actions";
import { useHTTP } from "../../../shared/hooks/http-hook";
import ConfirmEmail from "./ConfirmEmail";
import "../../../App.css";
import { handleLoading } from "../../utils/is-loading";
import google from "../../../img/google.png";
import brush from "../../../img/brush.png";

const callGoogle = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;

const LoginForm = ({ login, setUserId }) => {
  const returnToBookmarks = useMatch("bookmarks/login");
  const parseScore = JSON.parse(localStorage.getItem("score"));

  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(null);
  const [badpass, setBadPass] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData.badpass) {
        setBadPass(true);
      } else {
        setUserId(responseData.userId);
        login(
          responseData.userId,
          responseData.token,
          responseData.userType,
          responseData.fullname,
          responseData.sound,
          parseScore.score
        );
      }
    } catch (err) {
      console.log(err, "failed to do the http thing...");
    }
  };

  return (
    <div className="login-inner-container">
      {!error && resent && <ConfirmEmail email={email} />}
      {!error && isLoading && (
        <div className="loading-container">{handleLoading()}</div>
      )}

      {!error && !isLoading && !resent && (
        <div className="login-container">
          <button className="login-google-button" type="submit">
            <img className="google-icon" src={google} />
            <a className="login-google-text" href={callGoogle}>
              Login with Google
            </a>
          </button>
          <div className="login-line">
            <span className="login-line-or">or</span>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required")
                .test(
                  "email",
                  "Try logging in with Google below.",
                  function (value) {
                    return new Promise((resolve, reject) => {
                      axios
                        .get(
                          `${process.env.REACT_APP_BACKEND_URL}/api/users/checkloginemail/${value}`
                        )
                        .then((res) => {
                          resolve(true);
                          if (res.data.status === "Pending") {
                            setIsPending("Pending");
                          }
                        })
                        .catch((error) => {
                          resolve(false);
                        });
                    });
                  }
                ),
              password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .max(30, "Must be 30 characters or less")
                .required("Required"),
            })}
            validateOnChange={false}
            onSubmit={(values) => {
              handleLogin(values.email, values.password);
              setEmail(values.email);
            }}
          >
            <Form className="login-form-container">
              <div className="login-input-container">
                <p className="login-input-label" htmlFor="email">
                  Email
                </p>
                <Field className="input-field-login" name="email" type="text" />
                <ErrorMessage className="input-label" name="email">
                  {(msg) => <div className="input-error">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="login-input-container">
                <p className="login-input-label" htmlFor="password">
                  Password
                </p>
                <Field
                  className="input-field-login"
                  name="password"
                  type="password"
                />
                <ErrorMessage className="input-error" name="password">
                  {(msg) => <div className="input-error">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="pass-container">
                <Link to="/resetpass" className="forgot-pass-text">
                  Forgot password?
                </Link>
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
            </Form>
          </Formik>

          <div className="new-account">
            <div className="new-account-link-container">
              <p className="new-account-text">Don't have an account?</p>
              <Link className="new-account-link" to="/signup">
                Sign Up
              </Link>
            </div>
            <div className="new-account-underline">
              <img className="brush" src={brush} />
            </div>
          </div>
        </div>
      )}
      {isPending && (
        <div className="pending">
          Looks like you still need to confirm your email.{" "}
          <button className="signup-button"> Resend code.</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login.login,
  };
};

export default connect(mapStateToProps, { setUserId })(LoginForm);
