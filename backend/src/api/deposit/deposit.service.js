import depositListModel from '../../db/model/depositList/deposit.model';
import bckModel from '../../db/model/bucketList/bucketList.model';
import { MONEY_COMPLETE, SAVING_DEPOSIT, FIXED_DEPOSIT, DATE_COMPLETE } from '../../common/constants';

exports.saveDeposit = async (targetIdx, targetType, money) =>{
    const userIdx = 1;

    const depositInfo = {
        targetIdx: targetIdx,
        targetType: targetType,
        depositAmount: money,
    };

    const depositIdx = await depositListModel.createDepositM(depositInfo, userIdx);

    return depositIdx;
};

exports.depositTargetTypeValidate = async (targetIdx) => {
    const typeInfo = await depositListModel.findTargetType(targetIdx);
    return typeInfo;
}

exports.depositTypeValidate = async (targetIdx, typeIdx) => {
    const userIdx = 1;
    const isBucketList = typeIdx == MONEY_COMPLETE || typeIdx == DATE_COMPLETE;
    const isProperty = typeIdx == FIXED_DEPOSIT || typeIdx == SAVING_DEPOSIT;
    let validateResult = null;


    validateResult = isBucketList && await bckModel.findBckInfoM(targetIdx, userIdx);
    //validateResult = isProperty && 0;

    return validateResult;
}


