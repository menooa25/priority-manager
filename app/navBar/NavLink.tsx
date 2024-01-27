"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  href: string;
}
const NavLink = ({ href, title }: Props) => {
  const pathName = usePathname();
  const linkCasses = classNames({
    "tab-active font-bold": pathName === href,
  });
  return (
    <Link
      href={href}
      role="tab"
      className={"tab text-nowrap tracking-tight " + linkCasses}
    >
      {title}
    </Link>
  );
};

export default NavLink;
