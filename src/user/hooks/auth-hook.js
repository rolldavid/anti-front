import { useState, useCallback, useEffect } from "react";
import { useScore } from "./score-hook";
let logoutTimer;

export const useAuth = () => {
  const [tokenExpiration, setTokenExpiration] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [type, setType] = useState();
  const { updateScore } = useScore();

  const login = useCallback(
    (uid, token, type, fullname, sound, score, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setType(type);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpiration(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          userType: type,
          fullname: fullname,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      localStorage.setItem("sound", JSON.stringify({ soundStatus: sound }));
      updateScore(uid, score);
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
    setType(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("sound");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const soundData = JSON.parse(localStorage.getItem("sound"));
    const parseScore = JSON.parse(localStorage.getItem("score"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.userType,
        storedData.fullname,
        soundData.soundStatus,
        parseScore.score,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { login, logout, token, userId, type };
};
