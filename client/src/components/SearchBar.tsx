import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      id="search-bar"
      className="bg-gray-100 px-4 py-2 w-5/12 flex flex-row rounded-full items-center"
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <input
        name="search"
        id="search"
        value={value}
        onChange={handleChange}
        placeholder="Search"
        className="flex-1 bg-transparent focus:outline-none ml-2"
      />
    </div>
  );
}
