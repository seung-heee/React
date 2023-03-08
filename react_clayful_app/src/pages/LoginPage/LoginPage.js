import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  // 이메일 입력 시
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //패스워드 입력 시
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 로그인 버튼 클릭 시
  const handleSubmit = (event) => {
    event.preventDefault();

    var Customer = clayful.Customer;

    var payload = {
      email,
      password,
    };

    // payload로 사용자의 email, pw 넘겨주고
    Customer.authenticate(payload, function (err, result) {
      if (err) {
        // 에러면
        console.log(err.code);
        return; // 콘솔 출력 후 리턴
      }

      // 로컬스토리지에 customer과 token 저장 / 로그인 성공 시
      localStorage.setItem("customerUid", result.data.Customer);
      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("expiresIn", result.data.expiresIn);
      console.log(result.data);

      navigate("/");
      isAuthenticated();
    });
  };

  // 실제 출력 부분
  return (
    <div className="auth-wrapper">
      <h1>로그인</h1>

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

        <p>
          Apple ID는 iTunes, App store, iCloud에 로그인할 때 사용하는 이메일
          주소입니다.
        </p>

        <button type="submit">로그인</button>
        <Link to="/register" style={{ color: "gray", textDecoration: "none" }}>
          {" "}
          Apple ID가 없으신가요? 지금 생성!
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
