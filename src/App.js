import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import React, { Suspense, useEffect } from "react";

import { useAuth } from "./user/hooks/auth-hook";
import { handleLoading } from "./user/utils/is-loading";
import {
  setToken,
  setUserId,
  setStatus,
  callLogin,
  callLogout,
} from "./user/actions";
import { setUserType } from "./admin/actions";
import Main from "./shared/components/Main";
import "./App.css";
import "./user/components/auth/Login.css";

const TrivMain = React.lazy(() => import("./trivia/components/TrivMain"));
const Signup = React.lazy(() => import("./user/components/auth/Signup"));
const Login = React.lazy(() => import("./user/components/auth/Login"));


const Welcome = React.lazy(() => import("./user/components/auth/Welcome"));


const ResetPassSend = React.lazy(() =>
  import("./user/components/auth/ResetPassSend")
);
const ResetPassConfirm = React.lazy(() =>
  import("./user/components/auth/ResetPassConfirm")
);
const ContributeQuestions = React.lazy(() =>
  import("./admin/components/ContributeQuestions")
);
const ReviewQuestions = React.lazy(() =>
  import("./admin/components/ReviewQuestions")
);

const ProfileMain = React.lazy(() => import("./user/components/ProfileMain"));
const Stats = React.lazy(() => import("./admin/components/Stats"));
const PracticeMain = React.lazy(() =>
  import("./trivia/components/PracticeMain")
);
const SocialAuthLanding = React.lazy(() =>
  import("./user/components/auth/SocialAuthLanding")
);
const Bookmarks = React.lazy(() => import("./trivia/components/Bookmarks"));

const App = ({
  setToken,
  setUserId,
  setStatus,
  callLogin,
  callLogout,
  userStatus,
  userType,
  setUserType,
}) => {
  const { token, login, logout, userId, type } = useAuth();

  useEffect(() => {
    setToken(token);
    setStatus(token);
    setUserId(userId);
    callLogin(login);
    callLogout(logout);
    setUserType(type);
  }, []);

  useEffect(() => {
    setStatus(token);
  }, [token]);

  useEffect(() => {
    setUserType(type);
  }, [type]);

  let routes;
  if (userStatus && userType === "User") {
    routes = (
      <Route path="/" element={<Main />}>
        <Route
          index
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/daily"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <PracticeMain />
            </Suspense>
          }
        />
        <Route
          path="/bookmarks/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Bookmarks />
            </Suspense>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ProfileMain />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Navigate to="/" replace />
            </Suspense>
          }
        />
      </Route>
    );
  } else if (userStatus && userType === "Contributor") {
    routes = (
      <Route path="/" element={<Main />}>
        <Route
          index
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/daily"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <PracticeMain />
            </Suspense>
          }
        />
        <Route
          path="/bookmarks/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Bookmarks />
            </Suspense>
          }
        />
        <Route
          path="/addgame"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ContributeQuestions />
            </Suspense>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ProfileMain />
            </Suspense>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Route>
    );
  } else if (userStatus && userType === "Admin") {
    routes = (
      <Route path="/" element={<Main />}>
        <Route
          index
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/daily"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/stats"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Stats />
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <PracticeMain />
            </Suspense>
          }
        />
        <Route
          path="/bookmarks/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Bookmarks />
            </Suspense>
          }
        />
        <Route
          path="/reviewgame"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ReviewQuestions />
            </Suspense>
          }
        />
        <Route
          path="/addgame"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ContributeQuestions />
            </Suspense>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ProfileMain />
            </Suspense>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Route>
    );
  } else {
    routes = (
      <Route path="/" element={<Main />}>
        <Route
          index
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/daily"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <TrivMain />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Signup />
            </Suspense>
          }
        />

        <Route
          path="/welcome/:confirmationCode"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Welcome />
            </Suspense>
          }
        />
        <Route
          path="/resetpass"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ResetPassSend />
            </Suspense>
          }
        />
        <Route
          path="/reset/:confirmationCode"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ResetPassConfirm />
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <PracticeMain />
            </Suspense>
          }
        />
        <Route
          path="/auth/:authId"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <SocialAuthLanding />
            </Suspense>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <ProfileMain />
            </Suspense>
          }
        />
        <Route
          path="/bookmarks/:uid"
          element={
            <Suspense fallback={<div>{handleLoading()}</div>}>
              <Bookmarks />
            </Suspense>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Route>
    );
  }

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    userStatus: state.userStatus.userStatus,
    userType: state.userType.userType,
  };
};

export default connect(mapStateToProps, {
  setToken,
  setUserId,
  setStatus,
  callLogin,
  callLogout,
  setUserType,
})(App);
