"use client";

import { signOut } from "next-auth/react";

const Profile = () => {
  return (
    <button className="btn " onClick={() => signOut()}>
      خروج از حساب کاربری
    </button>
  );
};

export default Profile;
