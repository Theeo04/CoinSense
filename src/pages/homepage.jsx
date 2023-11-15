import React from "react";
import Menu from "@/components/Menu";
import UserProfile from "@/components/UserProfile";

function homepage() {
  return (
    <div className="homepage-bg">
      <Menu />
      <UserProfile />
    </div>
  );
}

export default homepage;
