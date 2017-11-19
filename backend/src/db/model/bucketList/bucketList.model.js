import mapper from '../../mapper';


exports.getBckListM = (userIdx) => {
    return mapper.bucketList
        .findAll({
            attributes: ['bckIdx','bckTitle',`targetAmount`,'typeIdx',`startDate`,'completeDate'],
            include: [{
                model: mapper.depositList,
                where: {
                    targetIdx : {$col: 'bucketList.typeIdx'}
                },
                required: false
            }],
            where: { userIdx: { $and :[userIdx] }  }
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.getBckDetailInfoM = (bckIdx, userIdx) => {
    return mapper.bucketList
        .findOne({
            attributes: ['bckIdx','bckTitle','bckDetail',`targetAmount`,'typeIdx',`startDate`,'completeDate'],
            include: [{
                model: mapper.depositList,
                where: {
                    targetIdx : {$col: 'bucketList.typeIdx'}
                },
                required: false
            }],
            where: {
                userIdx: { $and :[userIdx] },
                bckIdx: { $and :[bckIdx] }
            }
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};
