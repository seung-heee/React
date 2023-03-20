import "./ReviewList.css";

// 숫자 형식인 createdAt을 날짜 형식으로 변경
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// 각 영화 1개 정보
function ReviewListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

// 영화 list
function ReviewList({ items, onDelete }) {
  return (
    // 각 요소를 map으로 렌더링
    <ul>
      {items.map((item) => {
        return (
          // 고유한 key 지정
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
            <input value={item.title}></input>
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
