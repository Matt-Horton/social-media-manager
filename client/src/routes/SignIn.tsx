import { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        setError("");

        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className=" bg-slate-100 h-screen w-full flex justify-center items-center">
            <div className="bg-white rounded-2xl w-8/12 flex flex-row h-4/6 overflow-hidden shadow-xl">
                <div className="flex-1 bg-gray-800"></div>
                <div className="flex-1 bg-white flex flex-col justify-center items-center">
                    <h3 className="text-4xl font-bold text-indigo-500">
                        Sign In
                    </h3>
                    <Form method="post" className="flex flex-col mt-4 w-3/4">
                        <InputLabel htmlFor="username" text="Username" />
                        <Input
                            id="username"
                            value={username}
                            onChange={setUsername}
                            placeholder="bob@gmail.com"
                        />
                        <InputLabel htmlFor="password" text="Password" />
                        <Input
                            id="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="Password123"
                        />
                        <hr />
                        {error ? (
                            <p className="text-red-500 pl-4">*{error}</p>
                        ) : null}
                        <button
                            onClick={handleSubmit}
                            className="bg-indigo-500 rounded-full py-2 text-white mt-4"
                        >
                            Submit
                        </button>
                        <p className="text-gray-800 text-center py-4">
                            Don't have an account?
                            <span>
                                <Link
                                    to={"/signup"}
                                    className="text-indigo-500 pl-1"
                                >
                                    Sign up
                                </Link>
                            </span>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}
