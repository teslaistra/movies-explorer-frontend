import React from "react";
import "./Profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProfileForm from "../ProfileForm/ProfileForm";

function Profile({ onEditProfile, handleSignout }) {
  return (
    <div className="profile">
      <Header loggedIn={true} />
      <ProfileForm
        onEditProfile={onEditProfile}
        handleSignout={handleSignout}
      />
      <Footer />
    </div>
  );
}

export default Profile;
