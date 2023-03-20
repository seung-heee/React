import ReviewList from "./ReviewList";
import mockitems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(mockitems);
  const [order, setorder] = useState("createdAt"); // 정렬 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // order에 따라 정렬기준 달라짐

  const handleNewestClick = () => setorder("createdAt"); // 최신순
  const handleBestClick = () => setorder("rating"); // 평점순

  const handleDelete = (id) => {
    // 삭제기능, 해당 요소의 id를 가지고 filter를 거쳐 삭제됨.
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

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
