import NavLink from "./NavLink";
import { GoGoal } from "react-icons/go";
import { BiTask, BiUser } from "react-icons/bi";

const routes = [
  { title: "فعالیت ها", href: "/tasks", Icon: <BiTask /> },
  { title: "هدف ها", href: "/", Icon: <GoGoal /> },
  { title: "حساب کاربری", href: "/profile", Icon: <BiUser /> },
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
      </div>
      <div className="btm-nav btm-nav-sm bg-base-200 sm:hidden">
        {renderNavLinks()}
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
