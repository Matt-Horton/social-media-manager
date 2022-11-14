import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <div id="sidebar" className="bg-gray-100 w-2/12 p-4 h-screen rounded-3xl">
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
      <nav>
        <SidebarLink text="Dashboard" to="/dashboard" />
        <SidebarLink text="Posts" to="/dashboard/posts" />
        <SidebarLink text="Media" to="/dashboard/media" />
        <SidebarLink text="Calendar" to="/dashboard/calendar" />
        <SidebarLink text="Stats" to="/dashboard/stats" />
      </nav>
    </div>
  );
}
