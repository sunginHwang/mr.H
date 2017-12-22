import express from 'express';
import authCtrl from './auth.ctrl';

const router = express.Router();



// router.get('/logout', authCtrl.getList); // 로그아웃
router.get('/login',authCtrl.login); // 로그인
router.get('/loadUserInfo',authCtrl.loadUserInfo); // 유저정보 부르기
router.post('/register', authCtrl.register); // 회원가입

export default router;

