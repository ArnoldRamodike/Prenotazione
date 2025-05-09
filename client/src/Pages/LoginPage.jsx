import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setuser } = useContext(UserContext);

  async function LoginUser(ev) {
    ev.preventDefault();
    try {
      const { response } = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setuser(response);
      alert("login Successfull");
      setRedirect(true);
    } catch (error) {
      alert("Login failed please try again later", error);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={LoginUser}>
          <input
            type="email"
            placeholder="your@mail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center pt-2 text-gray-500">
            Dont have account?{" "}
            <Link to={"/register"} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
