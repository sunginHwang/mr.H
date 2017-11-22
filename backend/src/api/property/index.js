import express from 'express';
import propertyCtrl from './property.ctrl';

const router = express.Router();

router.get('/list', propertyCtrl.getList); // 예,적금 리스트 정보 가져오기
router.get('/:propertyIdx', propertyCtrl.getDetailInfo); // 예,적금 상세 정보 가져오기
router.post('/:propertyType', propertyCtrl.create); // 예,적금 생성하기
router.delete('/:propertyIdx', propertyCtrl.delete); // 예,적금 삭제하기

export default router;