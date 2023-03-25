import { useState } from 'react';
import { Link } from 'react-router-dom';
import MBITSelect from './components/MBITSelect';

function New() {
  const [formValue, setFormValue] = useState({
    mbti: 'ESTJ',
    colorCode: '#000000',
  });

  function handleChange(name, value) {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }))
  }

  return (
    <div>
      <h1>새 컬러 등록하기</h1>
      <Link to="/">
        <img src="/images/x.svg" alt="취소" />
      </Link>

      <h2>MBTI</h2>
      <MBITSelect 
        value={formValue.mbti}
        onChange={(newMbti) => handleChange('mbti', newMbti)}
      />

      <h2>컬러</h2>
      <img src="/images/repeat.svg" alt="랜덤" />

      <input name="colorCode" />

      <button>컬러 등록</button>
    </div>
  )
}

export default New;