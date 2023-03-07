import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var Customer = clayful.Customer;

    var payload = {
      email,
      password,
    };

    console.log(payload); // 페이로드 확인

    // 회원가입 createMe
    Customer.createMe(payload, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      var data = result.data;

      console.log(data);

      navigate("/login");
    });
  };

  return (
    <div className="auth-wrapper">
      <h1>회원가입</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          value={email}
          placeholder="Apple ID"
        ></input>
        <input
          onChange={handlePasswordChange}
          type="password"
          name="password"
          value={password}
          placeholder="암호"
        ></input>

        <button type="submit">회원가입</button>
        <Link to="login" style={{ color: "gray", textDecoration: "none" }}>
          이미 Apple ID가 있다면? 지금 로그인!
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
