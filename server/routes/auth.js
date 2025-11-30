// server/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User 모델 가져오기

// 1. 사용자 회원가입
router.post('/register', async (req, res) => {
    // ... (유효성 검사, 중복 확인 로직 생략)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            pp_balance: 100000000 // 1억 PP 초기 지급
        });
        await user.save();
        res.status(201).send({ message: '회원가입 성공. 1억 PP가 지급되었습니다.' });
    } catch (e) {
        res.status(500).send({ error: '회원가입 실패.' });
    }
});

// 2. 사용자 로그인
router.post('/login', async (req, res) => {
    // ... (인증 로직 생략)
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send({ error: '사용자를 찾을 수 없습니다.' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send({ error: '비밀번호가 일치하지 않습니다.' });

        // 일반 JWT 토큰 생성
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 관리자 인증 코드 확인 및 관리자 토큰 발급
        let adminToken = null;
        if (req.body.adminCode === process.env.ADMIN_PASS_CODE) {
             adminToken = jwt.sign({ _id: user._id, role: 'admin' }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });
        }

        res.status(200).header('Authorization', `Bearer ${token}`).send({ 
            token, 
            user: { username: user.username, pp_balance: user.pp_balance },
            adminToken: adminToken // 관리자 코드 제출 시에만 토큰 제공
        });

    } catch (e) {
        res.status(500).send({ error: '로그인 실패.' });
    }
});

module.exports = router;