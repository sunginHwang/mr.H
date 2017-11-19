import wrapAsync from 'express-wrap-async';
import bucketListModel from '../../db/model/bucketList/bucketList.model';


exports.getBckList =  async (userIdx) => {
    const bckList = await bucketListModel.getBckListM(userIdx);
    return bckList;
};

exports.getBckDetailInfo =  async (bckIdx, userIdx) => {
    const bckInfo = await bucketListModel.getBckDetailInfoM(bckIdx, userIdx);
    return bckInfo;
};


