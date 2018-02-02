import express from 'express';
import mainCtrl from './main.ctrl';

const router = express.Router();

router.get('/mainInfo', mainCtrl.getMainInfo); // 메인페이지 정보 가져오기



export default router;

