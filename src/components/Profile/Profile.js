import React from "react";
import "./Profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProfileForm from "../ProfileForm/ProfileForm";

function Profile() {
  return (
    <div className="profile">
      <Header loggedIn={true} />
      <ProfileForm />
      <Footer />
    </div>
  );
}

export default Profile;
