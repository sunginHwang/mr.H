import express from 'express';
import bucketList from './bucketList';
import deposit from './deposit';

const router = express.Router();

router.use('/bucketList', bucketList);
router.use('/deposit', deposit);


export default router;
