import { Link } from "react-router-dom";
import {
  PaperAirplaneIcon,
  DocumentIcon,
  RectangleGroupIcon,
  PhotoIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type SidebarLinkProps = {
  text: string;
  to: string;
};

export default function SidebarLink({ text, to }: SidebarLinkProps) {
  const renderIcon = () => {
    switch (text) {
      case "Dashboard":
        return <RectangleGroupIcon className="h-5 w-5 mr-4" />;
      case "Posts":
        return <PaperAirplaneIcon className="h-5 w-5 mr-4" />;
      case "Media":
        return <PhotoIcon className="h-5 w-5 mr-4" />;
      case "Calendar":
        return <CalendarDaysIcon className="h-5 w-5 mr-4" />;
      case "Stats":
        return <ChartBarIcon className="h-5 w-5 mr-4" />;
      case "Accounts":
        return <UserGroupIcon className="h-5 w-5 mr-4" />;
      default:
        return <DocumentIcon />;
    }
  };
  return (
    <Link
      to={to}
      className="flex-row flex items-center p-4 text-l text-grey-600 rounded-full bg-gray-100 hover:bg-gray-200"
    >
      {renderIcon()}
      {text}
    </Link>
  );
}
