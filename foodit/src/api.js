export async function getFoods({ order = "createdAt", cursor, limit = 10 }) {
  // 이부분 cursor undefined 뜸ㅠ 해결 못함 아직 app.js!!!!!
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/2595/foods?${query}`); // fetch로 리퀘스트 후 리스폰스를 받고
  const body = await response.json(); // 리스폰스 객체의 json 메소드를 사용해서 바디
  return body; // 리턴
}
