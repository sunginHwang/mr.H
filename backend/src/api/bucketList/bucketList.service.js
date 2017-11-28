import bucketListModel from '../../db/model/bucketList/bucketList.model';
import { MONEY_COMPLETE, DATE_COMPLETE } from '../../common/constants';


exports.getBckList =  async (userIdx) => {
    const bckList = await bucketListModel.getBckListM(userIdx);
    return bckList;
};

exports.getBckDetailInfo =  async (bckIdx) => {
    const userIdx = 1;

    const bckInfo = await bucketListModel.findBckInfoM(bckIdx, userIdx);
    return bckInfo;
};

exports.saveBucketList = async (bucketListInfo, bckType) => {
    const userIdx = 1;

    const createdBckIdx = await bucketListModel.createBucketListM(bucketListInfo, bckType, userIdx);

    return createdBckIdx;
};

exports.bckTypeValidate = async  (bckType) => {
    const isBckType = bckType == DATE_COMPLETE || bckType == MONEY_COMPLETE;
    return isBckType;
};

exports.modifyBucketList = async (bckIdx, bucketListInfo) => {

    const createdBckIdx = await bucketListModel.updateBucketListM(bckIdx, bucketListInfo);

    return createdBckIdx;
};

exports.deleteBucketList = async (bckIdx) => {
    const deleteFlag = await bucketListModel.deleteBucketListM(bckIdx);
    return deleteFlag;
}

