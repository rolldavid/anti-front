import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { handleLoading } from "../../utils/is-loading";
import "./SocialAuthLanding.css";
import { useHTTP } from "../../../shared/hooks/http-hook";
import { setUserId, toggleSound } from "../../actions";

const SocialAuthLanding = ({ login, setUserId, toggleSound }) => {
  const parseScore = JSON.parse(localStorage.getItem("score"));
  const [loginUpdated, setLoginUpdated] = useState(false);
  const { authId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHTTP();

  useEffect(() => {
    setLoginUpdated(true);
  }, [login]);

  useEffect(() => {
    if (loginUpdated) {
      const handleGoogleLogin = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/googlelogin/${authId}`
          );

          login(
            responseData.userId,
            responseData.token,
            responseData.userType,
            responseData.fullname,
            responseData.sound,
            parseScore.score
          );
        } catch (err) {
          console.log(err);
        }
      };
      handleGoogleLogin();
    }
  }, [loginUpdated]);

  return <div>{handleLoading()}</div>;
};

const mapStateToProps = (state) => {
  return {
    login: state.login.login,
  };
};

export default connect(mapStateToProps, { setUserId })(SocialAuthLanding);
