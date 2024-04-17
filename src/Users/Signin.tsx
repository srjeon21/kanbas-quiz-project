import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      console.log(credentials);
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data ? err.response.data.message : "enter username & password");
    }
  };
  return (
    <div>
      <h1>Signin</h1>
      {error && <div>{error}</div>}
      <input placeholder="username" className="form-control w-25" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input placeholder="password" type="password" className="form-control w-25" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button className="btn btn-primary" onClick={signin}> Signin </button>
      <Link className="btn btn-warning" to="/Kanbas/Account/Signup">Create an Account</Link>
    </div>
  );
}