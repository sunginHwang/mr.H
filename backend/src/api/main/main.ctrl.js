import wrapAsync from 'express-wrap-async';
import propertyService from '../property/property.service';
import bckService from '../bucketList/bucketList.service';
import mainService from './main.service';
import { getTodayForYYYYMMDD } from '../../common/util';
import { MONEY_COMPLETE } from '../../common/constants';


exports.getMainInfo = wrapAsync( async (req, res) => {
    const userIdx = req.userInfo.userIdx;
    const limit = 2;
    const statusMonthCount = 6;
    const today = getTodayForYYYYMMDD();

    const bckList = await bckService.getBckList(userIdx, limit, today);
    const propertyList = await propertyService.getPropertyList(userIdx, limit, today);
    const currentLowAmount = await  mainService.getCurrentTotalPropertyMoney(userIdx);
    const propertyStatus = await mainService.getPropertyStatus(userIdx,statusMonthCount);

    const result = {
        bckList:bckList,
        propertyList: propertyList,
        currentLowAmount: currentLowAmount == null ? [] : currentLowAmount,
        propertyStatus: propertyStatus == null ? [] : propertyStatus
    };

    res.json(result);
});
