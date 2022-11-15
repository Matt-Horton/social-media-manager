import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import SearchBar from "./SearchBar";

export default function DashboardHeader() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="flex justify-between">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <ProfilePicture imageSrc="" />
    </div>
  );
}
