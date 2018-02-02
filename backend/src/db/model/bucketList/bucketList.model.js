import mapper from '../../mapper';


exports.getBckListM = (userIdx, limit) => {
    return mapper.bucketList
        .findAll({
            attributes: ['bckIdx','bckTitle',`targetAmount`,'typeIdx',
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('startDate'), '%Y-%m-%d'), 'startDate'],
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('completeDate'), '%Y-%m-%d'), 'completeDate']
            ],
            include: [{
                model: mapper.depositList,
                where: {
                    targetType : {$col: 'bucketList.typeIdx'}
                },
                required: false
            }],
            where: {
                userIdx: { $and :[userIdx] },
                delFlag: { $and :['N'] }
            },
            limit: limit
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.findBckInfoM = (bckIdx, userIdx) => {
    return mapper.bucketList
        .findOne({
            attributes: ['bckIdx','bckTitle','bckDetail',`targetAmount`,'typeIdx',
                [mapper.sequelize.fn('date_format', mapper.sequelize.col("startDate"), '%Y-%m-%d'), 'startDate'],
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('completeDate'), '%Y-%m-%d'), 'completeDate']
            ],
            include: [{
                model: mapper.depositList,
                attributes : [
                    'depositIdx', 'targetIdx', 'depositAmount', 'delFlag',
                    [mapper.sequelize.fn('date_format', mapper.sequelize.col('depositDate'), '%Y-%m-%d'), 'depositDate'],
                ],
                where: {
                    targetType : {$col: 'bucketList.typeIdx'}
                },
                required: false
            }],
            where: {
                userIdx: { $and :[userIdx] },
                delFlag: { $and :['N'] },
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

exports.createBucketListM = (bucketListInfo, bckType, userIdx) => {
    return mapper.bucketList
        .create({
            bckTitle : bucketListInfo.bckTitle,
            bckDetail : bucketListInfo.bckDetail,
            targetAmount : bucketListInfo.targetAmount,
            completeDate : bucketListInfo.completeDate,
            typeIdx : bckType,
            userIdx : userIdx
        })
        .then(function(results) {
            return results.bckIdx;
        })
        .catch(function(err) {
            console.log(err);
        });
};


exports.updateBucketListM = (bckIdx, userIdx, bucketListInfo) => {
    return mapper.bucketList
        .update(
            bucketListInfo,
            {
                where: {
                   bckIdx: bckIdx,
                   userIdx: userIdx,
                   delFlag: 'N'
                }
            }
        )
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.deleteBucketListM = (bckIdx, userIdx) => {
    return mapper.bucketList
        .update(
            {
                delFlag : 'Y'
            },
            {
                where: {
                        bckIdx: bckIdx,
                        userIdx: userIdx
                }
            }
        )
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};
