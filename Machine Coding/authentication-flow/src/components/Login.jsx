import React from "react";
import { useState } from "react";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = () => {};

  const handlePassword = () => {};
  return (
    <div>
      <div>Login</div>
      <input
        type="text"
        placeholder="email"
        onChange={handleUsername}
        value={userId}
      />
      <input
        type="password"
        placeholder="password"
        onChange={handlePassword}
        value={password}
      />
    </div>
  );
}
