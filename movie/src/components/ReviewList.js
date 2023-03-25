import "./ReviewList.css";
import Rating from "./Rating";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

// 숫자 형식인 createdAt을 날짜 형식으로 변경
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// 각 영화 1개 정보
function ReviewListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditCliCk = () => {
    onEdit(item.id);
  }

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditCliCk}>수정</button>
      </div>
    </div>
  );
}

// 영화 list
function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess}){
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);
  return (
    // 각 요소를 map으로 렌더링
    <ul>
      {items.map((item) => {
        // editingId와 일치할 때 ReviewForm 렌더링
        if(item.id === editingId) {
          const {id, imgUrl, title, rating, content } = item;
          const initialValues ={title, rating, content};

          const handleSubmit = (formData) => onUpdate(id, formData);
          

          const handleUpdateSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          }

          return (
            // 고유한 key 지정
            <li key={item.id}>
              <ReviewForm 
              initialValues = {initialValues}
              initialPreview = {imgUrl}
              onCancel={handleCancel} 
              onSubmit={handleSubmit}
              onSubmitSuccess={handleUpdateSuccess}
              />
            </li>
          );
        }
          return (
            // 고유한 key 지정
            <li key={item.id}>
              <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
            </li>
          );
      })}
    </ul>
  );
}

export default ReviewList;