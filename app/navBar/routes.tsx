import { GoGoal } from "react-icons/go";
import { BiTask, BiUser } from "react-icons/bi";

export const routes = [
  { title: "فعالیت ها", href: "/tasks", Icon: <BiTask /> },
  { title: "هدف ها", href: "/", Icon: <GoGoal /> },
  { title: "حساب کاربری", href: "/profile", Icon: <BiUser /> },
];
