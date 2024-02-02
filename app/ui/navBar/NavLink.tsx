"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  title: string;
  href: string;
  Icon?: ReactNode;
}
const NavLink = ({ href, title, Icon }: Props) => {
  const pathName = usePathname();
  const linkCasses = classNames({
    "tab-active font-bold": pathName === href,
  });
  const buttomLinkClass = classNames({
    "active font-bold": pathName === href,
  });
  return (
    <>
      <Link
        href={href}
        role="tab"
        className={
          "hidden sm:block tab text-nowrap tracking-tight " + linkCasses
        }
      >
        {title}
      </Link>
      <Link href={href} className={"sm:hidden bg-base-200  " + buttomLinkClass}>
        {Icon && Icon}
        <span className="btm-nav-label">{title}</span>
      </Link>
    </>
  );
};

export default NavLink;
