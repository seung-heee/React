import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";
import { createReview } from "../api";
import { deleteReview } from "../api";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]); // 리뷰 목록
  const [order, setorder] = useState("createdAt"); // 정렬 state
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // order에 따라 정렬기준 달라짐

  const handleNewestClick = () => setorder("createdAt"); // 최신순
  const handleBestClick = () => setorder("rating"); // 평점순

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if(!result) return;
    // 삭제기능, 해당 요소의 id를 가지고 filter를 거쳐 삭제됨.
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;

    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  }

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1,),
      ]
    })
  }

  // 초기데이터 불러옴
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT }); // 처음 렌더링된 후 콜백함수 실행
  }, [order]); // order 값이 바뀔 때, 재렌더링

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      
      <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess} />
      <ReviewList items={sortedItems} onDelete={handleDelete} onUpdate={handleUpdateSuccess} onUpdateSuccess={handleUpdateSuccess} />

      {/* 조건부렌더링으로 버튼 활성화/비활성화 */}
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;