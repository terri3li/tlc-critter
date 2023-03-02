import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../CurrentUserContext";

const UserProfile = () => {
  const { status, currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  // didn't finish

  useEffect(() => {
    fetch("/profile/user")
      .then((res) => res.json())
      .then((data) => {});
  }, []);

  return <h1>{currentUser.handle}</h1>;
};

export default UserProfile;
