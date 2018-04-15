import propertyModel from '../../db/model/property/property.model';
import { FIXED_DEPOSIT, SAVING_DEPOSIT } from '../../common/constants';


exports.getPropertyList =  async (userIdx, limit, completeDate) => {
    const propertyList = await propertyModel.getPropertyListM(userIdx, limit, completeDate);

    return propertyList;
};

exports.getPropertyDetailInfo =  async (propertyIdx, userIdx) => {
    const propertyInfo = await propertyModel.findPropertyInfoM(propertyIdx, userIdx);

    return propertyInfo;
};

exports.saveProperty = async (propertyInfo, propertyType, userIdx) => {
    const createdPropertyIdx = await propertyModel.createPropertyM(propertyInfo, propertyType, userIdx);

    return createdPropertyIdx;
};

exports.deleteProperty = async (propertyIdx, userIdx) => {
    const deleteFlag = await propertyModel.deletePropertyM(propertyIdx, userIdx);
    return deleteFlag;
};

exports.validatePropertyType = async  (propertyType) => {
    const isPropertyType = propertyType == FIXED_DEPOSIT || propertyType == SAVING_DEPOSIT;
    return isPropertyType;
};

exports.findPropertyTypeName = async  (propertyType) => {
    return propertyType == FIXED_DEPOSIT ? '예금' : '적금';
};



