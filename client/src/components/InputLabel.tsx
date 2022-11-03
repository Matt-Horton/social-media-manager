type InputLabelProps = {
    htmlFor: string;
    text: string;
};
export default function InputLabel({ htmlFor, text }: InputLabelProps) {
    return (
        <label htmlFor={htmlFor} className="text-gray-700 font-semibold pl-4">
            {text}
        </label>
    );
}
