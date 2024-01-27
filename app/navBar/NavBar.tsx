import Account from "./Account";
import NavLink from "./NavLink";
const routes = [
  { title: "فعالیت ها", href: "/tasks" },
  { title: "هدف ها", href: "/" },
];
const NavBar = () => {
  return (
    <div className="grid grid-cols-3">
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
  );
};
const renderNavLinks = () => {
  return routes.map((route) => (
    <NavLink key={route.href} href={route.href} title={route.title} />
  ));
};

export default NavBar;
