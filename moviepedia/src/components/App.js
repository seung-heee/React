import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt"); // 정렬 기능
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true); // 출력할 다음 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 네트워크 로딩 상태
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 정렬 기준에 따라 변경

  // 핸들러 등록
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    let result;
    try {
      // 리퀘스트 요청시
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      // 리퀘스트 에러 처리
      setLoadingError(error);
      return;
    } finally {
      // 리퀘스트가 끝나면 다시 false로
      setIsLoading(false);
    }

    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
      setHasNext(paging.hasNext);
    }
    setOffset(options.offset + reviews.length);
    console.log(offset);
    console.log(hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  // 컴포넌트가 처음 렌더링될 때 콜백함수 호출, 초기 데이터 사용
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]); // 정렬 값이 바뀔 때마다 서버에서 데이터를 받아옴, 동일한 경우 렌더링X
  // 처음 렌더링 => 콜백함수 실행 / 이후 디펜던시 값들이 바뀔 때만 콜백함수 실행

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      {/* mock 데이터를 props으로 내려줌 */}
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* 조건부 렌더링, hasNext의 값이 false면 렌더링하지 않음 => 보이지 않음 */}
      {hasNext && (
        // isLoading이 true면 버튼 누르지 못함, 로딩중에 버튼 누르지 못하게 함.
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {/* 에러처리 */}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
export default App;
