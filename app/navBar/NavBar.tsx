import Account from "./Account";
import NavLink from "./NavLink";
import { GoGoal } from "react-icons/go";
import { BiTask } from "react-icons/bi";

const routes = [
  { title: "فعالیت ها", href: "/tasks", Icon: <BiTask /> },
  { title: "هدف ها", href: "/", Icon: <GoGoal /> },
];
const NavBar = () => {
  return (
    <>
      <div className="hidden sm:grid grid-cols-3 ">
        <div />
        <div>
          <div className="flex justify-center">
            <div role="tablist" className="tabs tabs-bordered ">
              {renderNavLinks()}
            </div>
          </div>
        </div>
        <div className="flex pt-2 pr-2 justify-end">
          <Account />
        </div>
      </div>
      <div className="btm-nav btm-nav-sm bg-base-200 sm:hidden">
        {renderNavLinks()}
        <button>
          <Account />
          <span className="btm-nav-label">حساب کاربری</span>
        </button>
      </div>
    </>
  );
};
const renderNavLinks = () => {
  return routes.map((route) => (
    <NavLink
      key={route.href}
      href={route.href}
      Icon={route.Icon}
      title={route.title}
    />
  ));
};

export default NavBar;
