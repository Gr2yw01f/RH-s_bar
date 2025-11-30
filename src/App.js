// client/src/App.js

import React from 'react';
import './App.css';
import Footer from './components/Footer.jsx'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 임시 페이지 컴포넌트 (실제 개발 시 Login.jsx, Dashboard.jsx 등으로 분리)
const LoginScreen = () => <div className="card-background" style={{ margin: '50px auto', width: '400px', textAlign: 'center' }}>
    <h1 className="gold-text">RH's BAR 로그인</h1>
    <p>1억 PP를 가지고 게임을 시작하세요.</p>
    <button>로그인 / 회원가입</button>
</div>;

const DashboardScreen = () => <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1 className="gold-text">환영합니다!</h1>
    <h2 className="silver-text">현재 잔액: 100,000,000 PP</h2>
    <p>홀짝 | 사다리 | 블랙잭 | 인디언 포커 | <span style={{color: 'red'}}>Bang!</span></p>
</div>;

function App() {
    return (
        <div className="App-Container">
            <Router>
                {/* 메인 콘텐츠 영역: Footer가 fixed로 되어 있어 padding-bottom으로 공간 확보 */}
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/dashboard" element={<DashboardScreen />} />
                        {/* 관리자 모드, 게임 화면 등 추가 라우트 */}
                    </Routes>
                </main>
            </Router>
            
            <Footer /> {/* 요청하신 Footer 고정 */}
        </div>
    );
}

export default App;