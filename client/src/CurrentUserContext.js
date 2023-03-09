import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

//wanted to useNav to the error page like the other fetches but putting useNav inside the context component caused an error

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.profile);
        setStatus("idle");
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, status, error, setError }}
      >
        {children}
      </CurrentUserContext.Provider>
    </>
  );
};

export default CurrentUserProvider;
