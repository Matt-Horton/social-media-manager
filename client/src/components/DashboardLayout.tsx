import { Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="p-8">
            <div className="rounded-3xl overflow-hidden flex flex-row gap-8">
                <Sidebar />
                <div className="w-10/12">
                    <DashboardHeader />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
