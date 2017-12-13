import express from 'express';
import authCtrl from './auth.ctrl';

const router = express.Router();



// router.get('/logout', authCtrl.getList); // 로그아웃
router.get('/login',authCtrl.login); // 로그인
router.post('/register', authCtrl.register); // 회원가입

export default router;

