import Input from "./Input";
import InputLabel from "./InputLabel";

type InputFieldProps = {
  id: string;
  type: "text" | "password";
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
};

export default function InputField({
  id,
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <InputLabel htmlFor={id} text={label} />
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        hasError={!!errorMessage}
      />
      {errorMessage && (
        <p className="text-red-500 text-l pl-4">*{errorMessage}</p>
      )}
    </div>
  );
}
