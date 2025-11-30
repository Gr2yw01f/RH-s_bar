// server/server.js

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// .env 파일의 환경 변수를 로드합니다. (MONGO_URI, PORT, JWT_SECRET 등)
dotenv.config();

// 환경 변수 설정
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// --- 1. Express 서버 및 Socket.IO 설정 ---
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: CORS_ORIGIN, // 클라이언트(React) 주소 허용
        methods: ["GET", "POST"]
    }
});

// --- 2. 미들웨어 설정 ---
// CORS 설정: 클라이언트의 요청을 허용합니다.
app.use(cors({ origin: CORS_ORIGIN })); 

// JSON 형식의 요청 본문을 파싱합니다.
app.use(express.json());


// --- 3. 데이터베이스 연결 ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB에 성공적으로 연결되었습니다.'))
    .catch(err => {
        console.error('❌ MongoDB 연결 실패:', err.message);
        // 연결 실패 시 서버 종료 (필수)
        process.exit(1); 
    });


// --- 4. API 라우팅 설정 ---

// 라우터 파일들을 가져옵니다.
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
// const gameRoutes = require('./routes/game'); // 게임 API (예: 베팅, 카드 요청)

// 엔드포인트에 라우터를 연결합니다.
app.use('/api/auth', authRoutes);
// 🚨 /api/admin/* 경로는 ADMIN_JWT_SECRET으로 보호됩니다.
app.use('/api/admin', adminRoutes); 
// app.use('/api/game', gameRoutes); 

// 기본 상태 확인 라우트
app.get('/', (req, res) => {
    res.send('RHs BAR Backend Server is Running.');
});


// --- 5. Socket.IO (실시간 통신) 로직 ---

io.on('connection', (socket) => {
    console.log(`[Socket] 새로운 플레이어가 접속했습니다: ${socket.id}`);

    // 여기에 Bang! 게임, 블랙잭, 홀짝 등 실시간 게임 로직을 추가합니다.
    
    // 예시: 클라이언트가 'bet_made' 이벤트를 보냈을 때
    socket.on('bet_made', (data) => {
        console.log(`[Bet] ${socket.id}가 ${data.game}에 ${data.pp} PP를 베팅했습니다.`);
        // 게임 로직 처리 후 모든 클라이언트에게 결과 브로드캐스팅
        io.emit('game_update', { message: '새로운 베팅이 접수되었습니다.' });
    });

    // 클라이언트 연결 해제
    socket.on('disconnect', () => {
        console.log(`[Socket] 플레이어가 접속을 해제했습니다: ${socket.id}`);
    });
});


// --- 6. 서버 시작 ---
server.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    console.log(`CORS 허용 출처: ${CORS_ORIGIN}`);
});