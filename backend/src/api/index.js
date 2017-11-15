import express from 'express';
import board from './board/board.ctrl';
import test from './board/test';

const router = express.Router();

router.use('/board', board);
router.use('/test', test.paymentInfo);

export default router;
