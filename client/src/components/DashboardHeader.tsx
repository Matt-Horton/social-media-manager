import { useState } from "react";
import SearchBar from "./SearchBar";

export default function DashboardHeader() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
    </div>
  );
}
