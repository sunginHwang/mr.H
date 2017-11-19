import express from 'express';
import bucketList from './bucketList';

const router = express.Router();

router.use('/bucketList', bucketList);

export default router;
