"use client";

import { useSession } from "next-auth/react";

const Avatar = () => {
  const { data } = useSession();
  const image = data?.user?.image;
  if (!image) return null;
  return (
    <div className="avatar">
      <div className="w-7 rounded-full">
        <img src={image} />
      </div>
    </div>
  );
};

export default Avatar;
