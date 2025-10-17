import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 곧 생성할 주 컴포넌트

// React 18 버전의 표준 렌더링 코드
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 애플리케이션의 최상위 컴포넌트 */}
    <App /> 
  </React.StrictMode>
);