import propertyModel from '../../db/model/property/property.model';


exports.getCurrentTotalPropertyMoney =  async (userIdx) => {
    const currentTotalPropertyMoney = await propertyModel.getCurrentTotalPropertyMoneyM(userIdx);
    return currentTotalPropertyMoney;
};

exports.getPropertyStatus =  async (userIdx, month = 6) => {
    const propertyStatus = await propertyModel.getPropertyStatusM (userIdx, month);
    return propertyStatus;
};
