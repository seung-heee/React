import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  // 여러 개의 state를 하나로 관리
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  // 하나의 핸들러로 관리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 폼 제출했을 때 console.log로 확인
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleChange}
      ></input>
      <textarea
        name="content"
        value={values.content}
        onChange={handleChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
