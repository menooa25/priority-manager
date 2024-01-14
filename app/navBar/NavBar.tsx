import NavLink from "./NavLink";
const routs = [
  { title: "فردا", day: "tomorrow" },
  { title: "همه", day: "" },
];
const NavBar = () => {
  return (
    <div className="flex justify-center">
      <div role="tablist" className="tabs tabs-bordered">
        {routs.map((r) => (
          <NavLink key={r.day} day={r.day} title={r.title} />
        ))}
      </div>
    </div>
  );
};

export default NavBar;
