import "./ReviewForm.css";
import { useState } from "react";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  // 이벤트 핸들러
  // 제목
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 평점
  const handleRatingChange = (e) => {
    const nextRating = Number(e.target.value) || 0;
    setRating(nextRating);
  };
  // 내용
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      rating,
      content,
    });
  };

  return (
    // state값과 input값 동일하게
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input value={title} onChange={handleTitleChange}></input>
      <input type="number" value={rating} onChange={handleRatingChange}></input>
      <textarea value={content} onChange={handleContentChange}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;

// input - value에 state넣고 핸들러를 이용해 value(State) 변경시 setState로 상태 변경
