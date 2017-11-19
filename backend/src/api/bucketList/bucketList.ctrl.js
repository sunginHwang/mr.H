import wrapAsync from 'express-wrap-async';
import bckService from './bucketList.service';
import util from '../../common/util';


exports.getBckList = wrapAsync( async (req, res) => {
    const bckList = await bckService.getBckList(1);

    if(util.isEmptyJson(bckList)){
        res.status(403).send({errorMsg : '버킷리스트 내역이 없습니다.'});return;
    }


    res.json(bckList);
});

exports.getBckDetailInfo = wrapAsync( async (req, res) => {
    const { bckIdx } = req.params;

    const bckInfo = await bckService.getBckDetailInfo(bckIdx,1);

    if(util.isEmptyJson(bckInfo)){
        res.status(403).send({errorMsg : '버킷리스트 정보가 존재하지 않습니다.'});return;
    }

    res.json(bckInfo);
});

