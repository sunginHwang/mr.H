import wrapAsync from 'express-wrap-async';

import depositService from '../deposit/deposit.service';
import util from '../../common/util';
import { MONEY_COMPLETE } from '../../common/constants';

exports.create = wrapAsync( async (req, res) => {
    const { targetIdx, typeIdx } = req.params;
    const userIdx = req.userInfo.userIdx;
    const { depositAmount } = req.body;

    /*입금 타입 검사*/
    if(! await depositService.depositTargetTypeValidate(typeIdx)){
        res.status(403).send({errorMsg : '입금할 수 없는 타입 입니다.'});return;
    }

    /*입금 대상 검사*/
    if(! await depositService.depositTypeValidate(targetIdx,typeIdx)){
        res.status(403).send({errorMsg : '입금할 수 없는 종류 입니다.'});return;
    }

    const depositIdx = await depositService.saveDeposit(targetIdx, typeIdx, userIdx, depositAmount);

    if(depositIdx <= 0){
        res.status(403).send({errorMsg : '입금 실패.'});return;
    }

    res.json({successMsg : depositAmount+' 원이 입금되었습니다.'});
});
