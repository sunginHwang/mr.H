import express from 'express';
import bucketListCtrl from './bucketList.ctrl';

const router = express.Router();

router.get('/list', bucketListCtrl.getList); // 버킷리스트 리스트 정보 가져오기
router.get('/:bckIdx', bucketListCtrl.getDetailInfo); // 버킷리스트 상세 정보 가져오기
router.put('/:bckIdx', bucketListCtrl.modify); // 버킷리스트 수정하기
router.post('/:bckType', bucketListCtrl.create); // 버킷리스트 생성하기
router.delete('/:bckIdx', bucketListCtrl.delete); // 버킷리스트 삭제하기
router.post('/deposit/:bckIdx', bucketListCtrl.createDeposit); // 버킷리스트 입금처리



export default router;

