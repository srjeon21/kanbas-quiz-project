import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input className="form-control w-25" placeholder="username" value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input type="password" className="form-control w-25" placeholder="password" value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button className="btn btn-primary" onClick={signup}> Signup </button>
    </div>
  );
}