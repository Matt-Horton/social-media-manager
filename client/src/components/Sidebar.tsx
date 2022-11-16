import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="bg-gray-100 w-[var(--sidebar-width)] p-4  h-[calc(100vh-4rem)] rounded-3xl fixed top-8 left-8 flex flex-col"
    >
      <div className="flex justify-center items-center mt-12 mb-12">
        <Link to={"/"}>
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </Link>
      </div>
      <nav className="h-full flex flex-col justify-between">
        <div>
          <SidebarLink text="Dashboard" to="/dashboard" />
          <SidebarLink text="Posts" to="/dashboard/posts" />
          <SidebarLink text="Media" to="/dashboard/media" />
          <SidebarLink text="Calendar" to="/dashboard/calendar" />
          <SidebarLink text="Stats" to="/dashboard/stats" />
        </div>
        <div>
          <SidebarLink text="Accounts" to="/dashboard/accounts" />
        </div>
      </nav>
    </div>
  );
}
