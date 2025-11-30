// server/middlewares/auth.js

const jwt = require('jsonwebtoken');

// 1. 일반 사용자 인증 (로그인 필요)
exports.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) return res.status(401).send({ error: '인증 토큰이 필요합니다.' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 요청 객체에 사용자 정보 주입
        next();
    } catch (e) {
        res.status(401).send({ error: '유효하지 않은 토큰입니다.' });
    }
};

// 2. 🚨 고도 보안 관리자 인증 (참교육, PP 추가/제거용) 🚨
exports.authAdmin = (req, res, next) => {
    try {
        const adminToken = req.header('X-Admin-Token'); // 관리자 토큰은 별도 헤더 사용
        if (!adminToken) return res.status(403).send({ error: '관리자 토큰(X-Admin-Token)이 필요합니다.' });
        
        // ADMIN_JWT_SECRET을 사용해 토큰 검증
        const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET);
        
        if (decoded.role !== 'admin') return res.status(403).send({ error: '관리자 권한이 없습니다.' });
        
        req.admin = decoded; // 요청 객체에 관리자 정보 주입
        next();
    } catch (e) {
        res.status(401).send({ error: '유효하지 않은 관리자 토큰입니다.' });
    }
};