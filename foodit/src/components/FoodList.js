import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);
  const { imgUrl, title, calorie, content, createdAt } = item;

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{calorie} kcal</p>
        <p>{content}</p>
        <div>{formatDate(createdAt)}</div>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
