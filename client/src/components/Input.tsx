type InputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
};
export default function Input({
    id,
    value,
    onChange,
    placeholder,
}: InputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className="bg-gray-100 rounded-full px-4 py-2 mt-1 mb-4 focus:outline-indigo-500"
        />
    );
}
