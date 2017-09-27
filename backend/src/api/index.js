import express from 'express';
import board from './board/board.ctrl';

const router = express.Router();

router.use('/board', board);

export default router;
