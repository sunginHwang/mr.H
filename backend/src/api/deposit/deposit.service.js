import depositListModel from '../../db/model/depositList/deposit.model';
import propertyModel from '../../db/model/property/property.model';
import bckModel from '../../db/model/bucketList/bucketList.model';

import { MONEY_COMPLETE, SAVING_DEPOSIT, FIXED_DEPOSIT, DATE_COMPLETE } from '../../common/constants';

exports.saveDeposit = async (targetIdx, targetType, userIdx, money) =>{

    const depositInfo = {
        targetIdx: targetIdx,
        targetType: targetType,
        depositAmount: money,
        userIdx: userIdx
    };

    const depositIdx = await depositListModel.createDepositM(depositInfo);

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

    if(isBucketList)
        validateResult = await bckModel.findBckInfoM(targetIdx, userIdx);
    if(isProperty)
        validateResult = await propertyModel.findPropertyInfoM(targetIdx, userIdx);

    return validateResult;
}


