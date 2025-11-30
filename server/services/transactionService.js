// server/services/transactionService.js

const User = require('../models/User'); 

// PP 잔액을 업데이트하는 통합 함수
exports.updateUserPP = async (userId, amount) => {
    if (amount === 0) throw new Error("변경 금액은 0이 될 수 없습니다.");

    // MongoDB 트랜잭션을 사용하여 원자성(Atomic) 보장 (고급 설정 필요)
    // 여기서는 단순 업데이트 로직만 구현합니다.

    const update = amount > 0 ? { $inc: { pp_balance: amount } } : { $inc: { pp_balance: amount } };
    
    // 만약 잔액이 마이너스가 되는 것을 방지하려면 복잡한 로직 추가 필요

    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    
    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }

    return {
        userId: user._id,
        username: user.username,
        pp_change: amount,
        new_pp_balance: user.pp_balance,
        message: amount > 0 ? `${amount} PP 추가 완료` : `${Math.abs(amount)} PP 제거 완료`
    };
};