import express from 'express';
import bucketListCtrl from './bucketList.ctrl';

const router = express.Router();

router.get('/list', bucketListCtrl.getBckList);
router.get('/detail/:bckIdx', bucketListCtrl.getBckDetailInfo);


export default router;

