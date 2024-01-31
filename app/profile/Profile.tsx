"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data, status } = useSession();
  const [hideImage, setHideImage] = useState(false);
  const image = data?.user?.image;
  const nameOfUser = data?.user?.name;
  useEffect(() => {
    setHideImage(false);
  }, [image]);
  return (
    <div className="flex flex-col h-full justify-between w-full px-3">
      {nameOfUser && (
        <p dir="rtl" className="text-center w-full">
          {data?.user?.name} عزیز خوش آمدید 😊
        </p>
      )}
      {image && !hideImage && (
        <div className="avatar w-full flex justify-center mt-3">
          <div className="w-24 rounded-full">
            <img
              src={image}
              onError={() => setHideImage(true)}
              referrerPolicy="no-referrer"
              alt="user avatar"
            />
          </div>
        </div>
      )}
      <button className="btn btn-sm w-full mt-10" onClick={() => signOut()}>
        خروج از حساب کاربری
      </button>
    </div>
  );
};

export default Profile;
