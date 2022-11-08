type InputProps = {
  id: string;
  type: "text" | "password";
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError: boolean;
};

export default function Input({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  hasError,
}: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`rounded-full px-4 py-2 mt-1 focus:outline-indigo-500 box-border ${
        hasError ? "bg-red-100 border-red-500 border-2" : "bg-gray-100"
      }`}
    />
  );
}
