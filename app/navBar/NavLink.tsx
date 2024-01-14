"use client";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  title: string;
  day: string;
}
const NavLink = ({ day, title }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("day") ?? "";
  const params = new URLSearchParams(searchParams.toString());
  params.set("day", day);
  return (
    <button
      onClick={() => router.replace("/?" + params.toString())}
      role="tab"
      className={`tab ${day === currentParam && "tab-active"}`}
    >
      {title}
    </button>
  );
};

export default NavLink;
