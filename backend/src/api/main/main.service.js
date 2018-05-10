import propertyModel from '../../db/model/property/property.model';
import { getDateFormatForYYYYMM } from '../../common/util';

exports.getCurrentTotalPropertyMoney =  async (userIdx) => {
    const currentTotalPropertyMoney = await propertyModel.getCurrentTotalPropertyMoneyM(userIdx);
    return currentTotalPropertyMoney;
};

exports.getPropertyStatus =  async (userIdx, count = 6) => {
    let propertyStatus = [];
    let monthDate = new Date();
    
    for (let i = 0; i < count; i++) {
        const monthlyTotalProperty = await propertyModel.getPropertyStatusM (userIdx, getDateFormatForYYYYMM(monthDate));
        propertyStatus.unshift(monthlyTotalProperty[0]);
        monthDate.setMonth(monthDate.getMonth()-1);
    }

    return propertyStatus;
};
