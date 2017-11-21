import express from 'express';
import depositCtrl from './deposit.ctrl';

const router = express.Router();


router.post('/save/:targetIdx/type/:typeIdx', depositCtrl.create); // 버킷리스트 생성하기



export default router;

