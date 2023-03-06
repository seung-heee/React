import React from "react";
import Button from "./Button";
import { useState } from "react";
import Board from "./board";
import "./App.css";

// 1 ~ n까지의 정수를 랜덤으로 반환해주는 함수
function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  // state 값을 변경할 때는 setter를 이용해서 변경해야 함.
  const [myHistory, setMyHistory] = useState([]);
  const [otherHistory, setOtherHistory] = useState([]);

  // 던지기 btn 누르면 실행
  const handleRollClick = () => {
    const nextMyNum = random(6);
    const nextOtherNum = random(6); // 랜덤 값을 받아서
    setMyHistory([...myHistory, nextMyNum]);
    setOtherHistory([...otherHistory, nextOtherNum]); // 새로운 배열을 만든다고 생각, 스프레드 문법 활용
    // 빈 배열 안에 기존의 배열 값들을 스프레츠 문법으로 펼쳐주고, 새로운 값을 추가해주는 방식
  };

  // 처음부터 btn 누르면 실행, 초기화
  const handleClearClick = () => {
    setMyHistory([]); // 기록부분, 빈 배열로 초기화
    setOtherHistory([]); // 기록부분, 빈 배열로 초기화
  };

  return (
    <div className="App">
      <div className="Btn">
        <Button className="App-button" color="blue" onClick={handleRollClick}>
          던지기
        </Button>
        <Button className="App-button" color="red" onClick={handleClearClick}>
          처음부터
        </Button>
      </div>

      <div className="Board">
        <div>
          <Board name="나" color="blue" gameHistory={myHistory} />
        </div>
        <div>
          <Board name="상대" color="red" gameHistory={otherHistory} />
        </div>
      </div>
    </div>
  );
}
export default App;
