import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import { useAuthContext } from "../context/AuthContext";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { currentUser } = useAuthContext();

  const navigate = useNavigate();
  let location = useLocation();
  const { login } = useAuthContext();

  let from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setError("");

    let formData = new FormData(e.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    login(username, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (currentUser.id) {
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return (
    <div className=" bg-slate-100 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-2xl w-8/12 flex flex-row h-4/6 overflow-hidden shadow-xl">
        <div className="flex-1 bg-gray-800"></div>
        <div className="flex-1 bg-white flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold text-indigo-500">Sign In</h3>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-3/4">
            <InputLabel htmlFor="username" text="Username" />
            <Input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={setUsername}
              placeholder="bob@gmail.com"
              hasError={false}
            />
            <InputLabel htmlFor="password" text="Password" />
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="Password123"
              hasError={false}
            />
            <hr />
            {error ? <p className="text-red-500 pl-4">*{error}</p> : null}
            <button
              type="submit"
              className="bg-indigo-500 rounded-full py-2 text-white mt-4"
            >
              Submit
            </button>
            <p className="text-gray-800 text-center py-4">
              Don't have an account?
              <span>
                <Link to={"/signup"} className="text-indigo-500 pl-1">
                  Sign up
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
