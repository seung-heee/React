import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  // 초기화 핸들러
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    // input 값을 빈 문자열로 초기화
    inputNode.value = "";
    // null 값으로 호출
    onChange(name, null);
  };
  //처음 렌더링 후 비동기로 콜백함수, 그 후 디펜던시 변경시에만
  useEffect(() => {
    if (!value) return;
    // 메모리를 할당하고 해당 파일의 주소를 만들어줌.
    const nextPreview = URL.createObjectURL(value); // 문자열 리턴
    setPreview(nextPreview);
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {/* 조건부 렌더링, 초기화 버튼 */}
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
