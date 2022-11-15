import { Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="p-8 ml-[calc(var(--sidebar-width)+2rem)]">
      <div className="rounded-3xl overflow-hidden flex flex-row gap-8">
        <Sidebar />
        <div className="w-full">
          <DashboardHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
