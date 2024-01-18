import Avatar from "./Avatar";
import NavLink from "./NavLink";
const routs = [
  { title: "فردا", day: "tomorrow" },
  { title: "همه", day: "" },
];
const NavBar = () => {
  return (
    <div className="grid grid-cols-3">
      <span></span>
      <div>
        <div className="flex justify-center">
          <div role="tablist" className="tabs tabs-bordered ">
            {routs.map((r) => (
              <NavLink key={r.day} day={r.day} title={r.title} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex pt-2 pr-2 justify-end">
        <Avatar />
      </div>
    </div>
  );
};

export default NavBar;
