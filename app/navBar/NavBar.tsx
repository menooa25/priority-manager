import NavLink from "./NavLink";
import { routes } from "./routes";

const NavBar = () => {
  return (
    <>
      <div className="hidden sm:flex justify-center ">
        <div>
          <div className="flex justify-center">
            <div role="tablist" className="tabs tabs-bordered ">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
      <div className="btm-nav btm-nav-md bg-base-200 sm:hidden">
        <NavLinks />
      </div>
    </>
  );
};
const NavLinks = () => {
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
