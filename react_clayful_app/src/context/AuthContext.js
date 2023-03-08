import { createContext, useState } from "react";
import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = () => {
    var Customer = clayful.Customer;

    // 로컬스토리지에 있는 토큰 받아와서
    let options = {
      customer: localStorage.getItem("accessToken"),
    };

    // 서버에 토큰 전달하고 true/false 판별
    Customer.isAuthenticated(options, function (err, result) {
      if (err) {
        console.log(err.code);
        setIsAuth(false);
        return;
      }

      var Headers = result.headers;
      var data = result.data;

      if (data.authenticated) {
        setIsAuth(true); // 성공시 IsAuth 값 true
        console.log("로그인 성공!", data);
      } else {
        setIsAuth(false);
      }
    });
  };

  const signOut = () => {
    setIsAuth(false); // IsAuth 값을 false로
    localStorage.removeItem("accessToken"); // 로컬스토리지 토큰 지우고
    navigate("/login"); // 로그인 페이지로 이동
  };

  const AuthContextData = {
    isAuth, // true or false
    isAuthenticated, // true/false 업데이트 해줌
    signOut,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
