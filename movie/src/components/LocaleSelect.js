import React from 'react'
import { useSetLocale, useLocale } from '../contexts/LacaleContext';
import './LocaleSelect.css';

function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  )
}

export default LocaleSelect