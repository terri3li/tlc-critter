import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const [user, setUser] = useState("");
  const { profileId } = useParams();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.profile);
      });
  }, []);

  if (user.isFollowingYou === true)
    return (
      <Container>
        <Avatar alt="user avatar" src={user.avatarSrc} />
        <Header alt="profile banner" src={user.bannerSrc} />

        <InfoContainer>
        <h1>{user.displayName}</h1>
        <div>@{user.handle}</div>
        {user.isFollowingYou ? (
          <div>is following you</div>
        ) : (
          <span>is not following you</span>
        )}
        <div>{user.bio}</div>
        <div>{user.isBeingFollowedByYou}</div>
        {/* add location icon below */}
        <div>{user.location}</div>
        <div>Likes: {user.numLikes}</div>
        {/* need to turn below into button and move to top left corner */}
        {user.isBeingFollowedByYou ? <div>Following</div> : <div>Follow</div>}
        {/* format date */}
        <div>{user.joined}</div>
        </InfoContainer>
      </Container>
    );
};

const Avatar = styled.img`
  width: 10vw;
  margin-top: 25vh;
  margin-left: 3vw;
  border-radius: 70px;
  border: solid 4px white;
  z-index: 1;
`;

const Header = styled.img`
  width: 50vw;
  position: absolute;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`

`;

export default Profile;
