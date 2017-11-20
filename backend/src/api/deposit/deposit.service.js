import depositListModel from '../../db/model/depositList/deposit.model';

exports.saveDeposit = async (targetIdx, targetType, money, depositDate) =>{
    const userIdx = 1;

    const depositInfo = {
        targetIdx: targetIdx,
        targetType: targetType,
        depositAmount: money,
        depositDate: depositDate
    };

    const depositIdx = await depositListModel.createDepositM(depositInfo, userIdx);

    return depositIdx;
};


