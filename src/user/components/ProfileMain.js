import { useEffect, useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./ProfileMain.css";
import { useHTTP } from "../../shared/hooks/http-hook";
import { handleLoading } from "../utils/is-loading";

const ProfileMain = ({ logout, userId, userStatus }) => {
  const soundData = JSON.parse(localStorage.getItem("sound"));

  const { uid } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [rank, setRank] = useState("");
  const [profileTotalPoints, setProfileTotalPoints] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [logoutUser, setLogoutUser] = useState(false);
  const [toggleSound, setToggleSound] = useState(true);
  const [editName, setEditName] = useState(false);
  const [rankPoints, setRankPoints] = useState(0);
  const [userType, setUserType] = useState("User");
  const [rankContainer, setRankContainer] = useState("rank-container-green");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${uid}`
        );
        setRank(responseData.rank);
        setProfileTotalPoints(responseData.totalPoints);
        setProfileName(responseData.name);
        setEmail(responseData.email);
        if (responseData.rank === "Seedling") {
          setRankPoints(10000 - responseData.totalPoints);
          setRankContainer("rank-container-green");
        } else if (responseData.rank === "Sapling") {
          setRankPoints(30000 - responseData.totalPoints);
          setRankContainer("rank-container-orange");
        } else if (responseData.rank === "Pollinator") {
          setRankPoints(50000 - responseData.totalPoints);
          setRankContainer("rank-container-red");
        } else if (responseData.rank === "Tree of Knowledge") {
          setRankPoints(100000 - responseData.totalPoints);
          setRankContainer("rank-container-violet");
        } else if (responseData.rank === "Eater of Forbidden Fruit") {
          setRankPoints(1000000 - responseData.totalPoints);
          setRankContainer("rank-container-black");
        } else {
          setRankPoints(0);
        }
      } catch (err) {
        console.log(err, "failed to do the http thing...");
      }
    };
    getUserInfo();
  }, [userStatus]);

  useEffect(() => {
    if (soundData) {
      setToggleSound(soundData.soundStatus);
    }
  }, []);

  const handleSound = async () => {
    setToggleSound((prev) => !prev);
    if (userStatus) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/sound`,
          "POST",
          JSON.stringify({
            sound: !toggleSound,
            uid,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        localStorage.setItem(
          "sound",
          JSON.stringify({ soundStatus: responseData.soundResponse })
        );
      } catch (err) {
        console.log(err, "failed to do the http thing...");
      }
    }
  };

  const handleUpdateUser = async (formName) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/updateusers`,
        "POST",
        JSON.stringify({
          uid,
          name: formName,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setProfileName(responseData.updatedUsername);
    } catch (err) {
      console.log(err, "failed to do the http thing...");
    }
  };

  const handleLogout = () => {
    setLogoutUser(true);
    logout();
  };

  return (
    <>
      <div className="account-header">Account</div>
      {!logoutUser && userStatus && (
        <div className="profile-container">
          <div className="profile-inner-container">
            <div className="profile-name-container">
              <h3 className="profile-name-detail">{profileName}</h3>
              <div className={rankContainer}>{rank}</div>
            </div>
            <div className="profile-details-container">
              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">Total Points</div>
                  <div className="profile-info-detail">
                    {profileTotalPoints}
                  </div>
                </div>
              </div>

              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">
                    Points Until Next Rank
                  </div>
                  <div className="profile-info-detail">{rankPoints}</div>
                </div>
              </div>
            </div>
            <div className="profile-details-container">
              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">Game Sounds</div>
                  <div className="profile-info-detail">
                    {toggleSound ? "ON" : "OFF"}
                  </div>
                </div>
                <div className="profile-edit">
                  <button className="profile-edit-button" onClick={handleSound}>
                    {toggleSound ? "Turn OFF" : "Turn ON"}
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="profile-details-container">
              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">Display Name</div>
                  {!editName && (
                    <div className="profile-info-detail">{profileName}</div>
                  )}
                  {editName && (
                    <div className="profile-input-container">
                      <Formik
                        initialValues={{ name: `${profileName}` }}
                        validationSchema={Yup.object({
                          name: Yup.string()
                            .min(5, "Must be at least 6 characters")
                            .max(15, "Must be 15 characters or less")
                            .required("Required")
                            .test(
                              "name",
                              "Username already taken",
                              function (value) {
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
                              }
                            ),
                        })}
                        validateOnChange={false}
                        onSubmit={(values) => {
                          handleUpdateUser(values.name);
                        }}
                      >
                        <Form className="edit-form-container">
                          <div className="edit-username-container">
                            <div className="login-input-container">
                              <p
                                className="login-input-label"
                                htmlFor="name"
                              ></p>
                              <Field
                                className="input-field-edit"
                                name="name"
                                type="text"
                              />
                              <ErrorMessage className="input-label" name="name">
                                {(msg) => (
                                  <div className="input-error">{msg}</div>
                                )}
                              </ErrorMessage>
                            </div>
                            <div className="profile-edit">
                              <button
                                className="profile-edit-button"
                                type="submit"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  )}
                </div>
                {!editName && (
                  <div className="profile-edit">
                    <button
                      className="profile-edit-button" 
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">email</div>
                  <div className="profile-info-detail">{email}</div>
                </div>
                <div className="profile-edit">
                  <button className="profile-edit-button">Edit</button>
                </div>
              </div>
              <div className="edit-wrap">
                <div className="profile-info">
                  <div className="profile-info-label">Password</div>
                  <div className="profile-info-detail">••••••••••</div>
                </div>
                <div className="profile-edit">
                  <button className="profile-edit-button">Change</button>
                </div>
              </div>
            </div> */}

            <div>
              <h3 className="profile-logout">
                <button
                  className="profile-logout-button"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </h3>
            </div>
          </div>
        </div>
      )}

      {logoutUser && (
        <div>
          <Navigate to="/" replace={true} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    logout: state.logout.logout,
    userId: state.userId.userId,
    userStatus: state.userStatus.userStatus,
  };
};

export default connect(mapStateToProps)(ProfileMain);
