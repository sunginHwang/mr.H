import wrapAsync from 'express-wrap-async';
import propertyService from './property.service';
import depositService from '../deposit/deposit.service';
import util from '../../common/util';
import { FIXED_DEPOSIT } from '../../common/constants';


exports.getList = wrapAsync( async (req, res) => {
    const userIdx = req.userInfo.userIdx;
    const propertyList = await propertyService.getPropertyList(userIdx);

    if(util.isEmptyJson(propertyList)){
        res.status(403).send({errorMsg : '등록 정보가 없습니다.'});return;
    }

    res.json(propertyList);
});

exports.getDetailInfo = wrapAsync( async (req, res) => {
    const { propertyIdx } = req.params;
    const userIdx = req.userInfo.userIdx;

    const propertyInfo = await propertyService.getPropertyDetailInfo(propertyIdx, userIdx);

    if(util.isEmptyJson(propertyInfo)){
        res.status(403).send({errorMsg : '등록 정보가 없습니다.'});return;
    }

    res.json(propertyInfo);
});

exports.create = wrapAsync( async (req, res) => {
    const { propertyType } = req.params;
    const propertyInfo = req.body;
    const userIdx = req.userInfo.userIdx;
    const { targetAmount, monthlyDepositAmount, completeDate, propertyTitle } = propertyInfo;

    if(! await propertyService.validatePropertyType(propertyType)){
        res.status(403).send({errorMsg : '등록할 수 없는 타입 입니다.'});return;
    }

    const propertyIdx = await propertyService.saveProperty(propertyInfo, propertyType, userIdx);

    //예금, 적금 명칭 구하기
    const typeName = await propertyService.findPropertyTypeName(propertyType);

    if(!propertyIdx){
        res.status(403).send({errorMsg : propertyTitle+'('+typeName+') 등록 실패.'});return;
    }

    //예,적금에 따른 초기 입금액 설정
    const depositAmount = propertyType == FIXED_DEPOSIT ? targetAmount
                                                        : monthlyDepositAmount;

    const depositIdx = await depositService.saveDeposit(propertyIdx, propertyType, userIdx, depositAmount);

    if(!depositIdx){
        res.status(403).send({errorMsg : propertyTitle+'('+typeName+') 초기금액 등록 실패.'});return;
    }


    res.json({successMsg : propertyTitle+'('+typeName+') 등록 성공'});
});


exports.delete = wrapAsync( async (req, res) => {
    const { propertyIdx } = req.params;
    const userIdx = req.userInfo.userIdx;

    const propertyInfo = await propertyService.getPropertyDetailInfo(propertyIdx, userIdx);

    if(util.isEmptyJson(propertyInfo)){
        res.status(403).send({errorMsg : '존재하지 않는 내역 입니다.'});return;
    }

    //예금, 적금 명칭 구하기
    const typeName = await propertyService.findPropertyTypeName(propertyInfo.typeIdx);

    const deleteSuccess = await propertyService.deleteProperty(propertyIdx, userIdx);
    const notifyMsg = propertyInfo.propertyTitle + ' '+typeName+' ';
    if(!deleteSuccess){
        res.status(403).send({errorMsg : notifyMsg+' 삭제 실패.'});return;
    }

    res.json({successMsg : notifyMsg+' 삭제 성공'});
});

