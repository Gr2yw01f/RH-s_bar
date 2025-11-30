// server/routes/admin.js

const express = require('express');
const router = express.Router();
const { authAdmin } = require('../middlewares/auth');
const transactionService = require('../services/transactionService'); // 서비스 가져오기
const User = require('../models/User'); // User 모델 가져오기

/**
 * 🚨 고도 보안 영역: PP 추가 및 제거 API (authAdmin 필수) 🚨
 */

// PP 추가 (Add)
router.post('/add-pp', authAdmin, async (req, res) => {
    const { userId, amount } = req.body;
    if (!userId || !amount || amount <= 0) return res.status(400).send({ error: '유효한 사용자 ID와 추가 금액이 필요합니다.' });
    try {
        const result = await transactionService.updateUserPP(userId, amount); // amount는 양수
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: e.message || 'PP 추가 중 오류 발생' });
    }
});

// PP 제거 (Remove)
router.post('/remove-pp', authAdmin, async (req, res) => {
    const { userId, amount } = req.body;
    if (!userId || !amount || amount <= 0) return res.status(400).send({ error: '유효한 사용자 ID와 제거 금액이 필요합니다.' });
    try {
        const result = await transactionService.updateUserPP(userId, -amount); // amount를 음수로 변환하여 제거
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: e.message || 'PP 제거 중 오류 발생' });
    }
});


/**
 * 🚨 고도 보안 영역: 참교육 (Loss Lock) API (authAdmin 필수) 🚨
 */
router.post('/set-loss-lock', authAdmin, async (req, res) => {
    const { userId, isLocked } = req.body;
    if (!userId || isLocked === undefined) return res.status(400).send({ error: '사용자 ID와 잠금 상태가 필요합니다.' });
    
    try {
        const user = await User.findByIdAndUpdate(userId, { loss_lock: isLocked }, { new: true });
        if (!user) return res.status(404).send({ error: '사용자를 찾을 수 없습니다.' });

        res.status(200).send({ 
            message: `참교육 모드가 ${isLocked ? '활성화' : '비활성화'}되었습니다.`, 
            userId,
            loss_lock_status: user.loss_lock
        });
    } catch (e) {
        res.status(500).send({ error: '참교육 설정 중 오류 발생' });
    }
});

module.exports = router;