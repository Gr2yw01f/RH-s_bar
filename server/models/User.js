// server/models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    pp_balance: { type: Number, required: true, default: 100000000 }, // 1억 PP 초기 지급
    
    // 🚨 참교육 기능: 패배 고정 플래그 🚨
    loss_lock: { type: Boolean, default: false }, 

    role: { type: String, default: 'user' }, // 'user' 또는 'admin'
    
    // PP 거래 기록 등을 위한 참조 (추가 가능)
    // transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
}, { 
    timestamps: true // 생성 및 업데이트 시간 자동 기록
});

module.exports = mongoose.model('User', userSchema);