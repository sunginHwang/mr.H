import propertyModel from '../../db/model/property/property.model';
import { FIXED_DEPOSIT, SAVING_DEPOSIT } from '../../common/constants';


exports.getPropertyList =  async (userIdx) => {
    const propertyList = await propertyModel.getPropertyListM(userIdx);
    return propertyList;
};

exports.getPropertyDetailInfo =  async (propertyIdx) => {
    const userIdx = 1;

    const propertyInfo = await propertyModel.findPropertyInfoM(propertyIdx, userIdx);
    return propertyInfo;
};

exports.saveProperty = async (propertyInfo, propertyType) => {
    const userIdx = 1;

    const createdPropertyIdx = await propertyModel.createPropertyM(propertyInfo, propertyType, userIdx);

    return createdPropertyIdx;
};

exports.deleteProperty = async (propertyIdx) => {
    const deleteFlag = await propertyModel.deletePropertyM(propertyIdx);
    return deleteFlag;
};

exports.validatePropertyType = async  (propertyType) => {
    const isPropertyType = propertyType == FIXED_DEPOSIT || propertyType == SAVING_DEPOSIT;
    return isPropertyType;
};

exports.findPropertyTypeName = async  (propertyType) => {
    return propertyType == FIXED_DEPOSIT ? '예금' : '적금';
};



