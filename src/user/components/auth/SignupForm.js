import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useHTTP } from "../../../shared/hooks/http-hook";
import "./SignupForm.css";
import Resend from "./Resend";
import ConfirmEmail from "./ConfirmEmail";
import { handleLoading } from "../../utils/is-loading";
import google from "../../../img/google.png";

const callGoogle = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;

const SignupForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [resent, setResent] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleGoogle = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google`
      );

      setSubmitted(true);
    } catch (err) {
      console.log(err, "failed to do the http thing...");
    }
  };

  const handleSignup = async (username, email, password) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
        "POST",
        JSON.stringify({
          name: username,
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setSubmitted(true);
    } catch (err) {
      console.log(err, "failed to do the http thing...");
    }
  };

  const handleTokenResend = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/resend`,
        "POST",
        JSON.stringify({
          email,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      clearError();
      setResent(true);
    } catch (err) {
      console.log(err, "failed to do the http thing while reseding.");
    }
  };

  return (
    <div className="signup-inner-container">
      {submitted && !isLoading && (
        <div className="signup-submit-container">
          <ConfirmEmail />
          <Resend handleResend={handleTokenResend} type="token" />
        </div>
      )}
      {isLoading && <div className="loading-container">{handleLoading()}</div>}
      {!submitted && !isLoading && !resent && (
        <div>
          <button className="signup-google-button" type="submit">
            <img className="google-icon" src={google} alt="google button" />
            <a className="signup-google-text" href={callGoogle}>
              Sign Up with Google
            </a>
          </button>
          <div className="login-line">
            <span className="login-line-or">or</span>
          </div>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(5, "Must be at least 6 characters")
                .max(15, "Must be 15 characters or less")
                .required("Required")
                .test("username", "Username already taken", function (value) {
                  return new Promise((resolve, reject) => {
                    axios
                      .get(
                        `${process.env.REACT_APP_BACKEND_URL}/api/users/checkuser/${value}`
                      )
                      .then((res) => {
                        resolve(true);
                      })
                      .catch((error) => {
                        resolve(false);
                      });
                  });
                }),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required")
                .test("email", "Email already exists.", function (value) {
                  return new Promise((resolve, reject) => {
                    axios
                      .get(
                        `${process.env.REACT_APP_BACKEND_URL}/api/users/checkemail/${value}`
                      )
                      .then((res) => {
                        resolve(true);
                      })
                      .catch((error) => {
                        resolve(false);
                      });
                  });
                }),
              password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .max(30, "Must be 30 characters or less")
                .required("Required"),
            })}
            validateOnChange={false}
            onSubmit={(values) => {
              handleSignup(values.username, values.email, values.password);
              setEmail(values.email);
            }}
          >
            <Form className="signup-form-container">
              <div className="signup-input-container">
                <p className="signup-input-label" htmlFor="username">
                  Username
                </p>
                <Field
                  className="input-field-signup"
                  name="username"
                  type="text"
                />
                <ErrorMessage name="username">
                  {(msg) => <div className="input-error">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="signup-input-container">
                <p className="signup-input-label" htmlFor="email">
                  Email
                </p>
                <Field
                  className="input-field-signup"
                  name="email"
                  type="text"
                />
                <ErrorMessage className="input-label" name="email">
                  {(msg) => <div className="input-error">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="signup-input-container">
                <p className="signup-input-label" htmlFor="password">
                  Password
                </p>
                <Field
                  className="input-field-signup"
                  name="password"
                  type="text"
                />
                <ErrorMessage className="input-error" name="password">
                  {(msg) => <div className="input-error">{msg}</div>}
                </ErrorMessage>
              </div>
              <button className="signup-button" type="submit">
                Sign Up
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
