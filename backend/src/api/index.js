import express from 'express';
import bucketList from './bucketList';
import property from './property';
import deposit from './deposit';

const router = express.Router();

router.use('/bucketList', bucketList);
router.use('/property',property);
router.use('/deposit', deposit);


export default router;
