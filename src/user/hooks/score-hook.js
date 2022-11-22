import { useHTTP } from "../../shared/hooks/http-hook";

export const useScore = () => {
  const parseStrikes = JSON.parse(localStorage.getItem("strikes"));
  const gameComplete = JSON.parse(localStorage.getItem("gameComplete"));
  const { isLoading, error, sendRequest, clearError } = useHTTP();

  const updateScore = async (userId, score) => {
    if (
      parseStrikes.strikes < 3 &&
      !gameComplete.scoreAdded &&
      gameComplete.complete
    ) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/updatescore`,
          "POST",
          JSON.stringify({
            uid: userId,
            score: score,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        localStorage.setItem(
          "gameComplete",
          JSON.stringify({
            ...gameComplete,
            scoreAdded: true,
          })
        );
      } catch (err) {
        console.log(err, "failed to do the http thing...");
      }
    }
  };

  return { updateScore };
};
