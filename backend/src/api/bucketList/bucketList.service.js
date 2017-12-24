import bucketListModel from '../../db/model/bucketList/bucketList.model';
import { MONEY_COMPLETE, DATE_COMPLETE } from '../../common/constants';


exports.getBckList =  async (userIdx) => {
    const bckList = await bucketListModel.getBckListM(userIdx);
    return bckList;
};

exports.getBckDetailInfo =  async (bckIdx, userIdx) => {
    const bckInfo = await bucketListModel.findBckInfoM(bckIdx, userIdx);
    return bckInfo;
};

exports.saveBucketList = async (bucketListInfo, bckType, userIdx) => {
    const createdBckIdx = await bucketListModel.createBucketListM(bucketListInfo, bckType, userIdx);

    return createdBckIdx;
};

exports.bckTypeValidate = async  (bckType) => {
    const isBckType = bckType == DATE_COMPLETE || bckType == MONEY_COMPLETE;
    return isBckType;
};

exports.modifyBucketList = async (bckIdx, userIdx, bucketListInfo) => {

    const createdBckIdx = await bucketListModel.updateBucketListM(bckIdx, userIdx, bucketListInfo);

    return createdBckIdx;
};

exports.deleteBucketList = async (bckIdx, userIdx) => {
    const deleteFlag = await bucketListModel.deleteBucketListM(bckIdx, userIdx);
    return deleteFlag;
}

