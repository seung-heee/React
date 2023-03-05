import diceBlue01 from "./assets/dice-blue-1.svg";

function Dice() {
  // src 속성에 파일 경로를 바로 작성하면 error
  return <img src={diceBlue01} alt="주사위" />;
}

export default Dice;
