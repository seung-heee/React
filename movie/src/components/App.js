import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setorder] = useState("createdAt"); // 정렬 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // order에 따라 정렬기준 달라짐

  const handleNewestClick = () => setorder("createdAt"); // 최신순
  const handleBestClick = () => setorder("rating"); // 평점순

  const handleDelete = (id) => {
    // 삭제기능, 해당 요소의 id를 가지고 filter를 거쳐 삭제됨.
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (orderQuery) => {
    // 데이터 받아옴
    const { reviews } = await getReviews(orderQuery);
    setItems(reviews);
  };

  // 초기데이터 불러옴
  useEffect(() => {
    handleLoad(order); // 처음 렌더링된 후 콜백함수 실행
  }, [order]); // order 값이 바뀔 때, 재렌더링

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>

      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
