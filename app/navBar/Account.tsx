"use client";
import { FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const Account = () => {
  const { data } = useSession();
  const image = data?.user?.image;
  if (!image) return null;
  return (
    <div className="dropdown dropdown-top sm:dropdown-end min-h-0 h-4 sm:h-auto ">
      <div tabIndex={0} role="button ">
        <div className="avatar pr-2 sm:pt-1 ">
          <FaUser className="sm:w-5 sm:h-5" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-20"
      >
        <li>
          <span onClick={() => signOut()}>خروج</span>
        </li>
      </ul>
    </div>
  );
};

export default Account;
