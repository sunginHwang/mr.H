import wrapAsync from 'express-wrap-async';
import bckService from './bucketList.service';
import depositService from '../deposit/deposit.service';
import util from '../../common/util';
import { MONEY_COMPLETE } from '../../common/constants';


exports.getList = wrapAsync( async (req, res) => {
    const userIdx = req.userInfo.userIdx;

    const bckList = await bckService.getBckList(userIdx);
    if(util.isEmptyJson(bckList)){
        res.status(403).send({errorMsg : '버킷리스트 내역이 없습니다.'});return;
    }

    res.json(bckList);
});

exports.getDetailInfo = wrapAsync( async (req, res) => {
    const { bckIdx } = req.params;
    const userIdx = req.userInfo.userIdx;

    const bckInfo = await bckService.getBckDetailInfo(bckIdx, userIdx);

    if(util.isEmptyJson(bckInfo)){
        res.status(403).send({errorMsg : '버킷리스트 정보가 존재하지 않습니다.'});return;
    }

    res.json(bckInfo);
});

exports.create = wrapAsync( async (req, res) => {
    const { bckType } = req.params;
    const { bckInfo, currentAmount } = req.body;
    const userIdx = req.userInfo.userIdx;

    if(! await bckService.bckTypeValidate(bckType)){
        res.status(403).send({errorMsg : '등록할 수 없는 완료타입 입니다.'});return;
    }

    const bckIdx = await bckService.saveBucketList(bckInfo, bckType, userIdx);

    if(!bckIdx){
        res.status(403).send({errorMsg : '버킷리스트 등록 실패.'});return;
    }

    /*버킷리스트 타입이 돈일경우 초기 금액 설정*/
    if(bckType == MONEY_COMPLETE){
        const depositIdx = await depositService.saveDeposit(bckIdx, bckType, userIdx, currentAmount);
      
        if(!depositIdx){
            res.status(403).send({errorMsg : '버킷리스트 초기금액 등록 실패.'});return;
        }
    }

    res.json({successMsg : '버킷리스트 등록 성공'});
});

exports.modify = wrapAsync( async (req, res) => {
    const { bckIdx } = req.params;
    const bckInfo = req.body;
    const userIdx = req.userInfo.userIdx;

    const bucketListInfo = await bckService.getBckDetailInfo(bckIdx, userIdx);
    
    if(util.isEmptyJson(bucketListInfo)){
        res.status(403).send({errorMsg : '존재하지 않는 버킷리스트 입니다.'});return;
    }

    const updateSuccess = await bckService.modifyBucketList(bckIdx, userIdx, bckInfo);
  
    if(!updateSuccess){
        res.status(403).send({errorMsg : '버킷리스트 수정 실패.'});return;
    }

    res.json({successMsg : '버킷리스트 수정 성공'});
});

exports.delete = wrapAsync( async (req, res) => {
    const { bckIdx } = req.params;
    const userIdx = req.userInfo.userIdx;

    const bckInfo = await bckService.getBckDetailInfo(bckIdx, userIdx);

    if(util.isEmptyJson(bckInfo)){
        res.status(403).send({errorMsg : '존재하지 않는 버킷리스트 입니다.'});return;
    }

    const deleteSuccess = await bckService.deleteBucketList(bckIdx, userIdx);

    if(!deleteSuccess){
        res.status(403).send({errorMsg : '버킷리스트 삭제 실패.'});return;
    }

    res.json({successMsg : '버킷리스트 삭제 성공'});
});


