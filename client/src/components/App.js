import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import styled from "styled-components";

//components
import Profile from "./Profile";
import HomeFeed from "./HomeFeed";
import TweetDetails from "./TweetDetails";
import Bookmarks from "./NotBeingUsed/Bookmarks";
import Notifications from "./NotBeingUsed/Notifications";
import Sidebar from "./Sidebar";
import CurrentUserProvider from "../CurrentUserContext";

const App = () => {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Wrapper>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:tweetId" element={<TweetDetails />} />
            <Route path="/:profileId" element={<Profile />} />
            {/* <Route path="*" element ={<PageNotFound />} /> */}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
