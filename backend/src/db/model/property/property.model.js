import mapper from '../../mapper';


exports.getPropertyListM = (userIdx, limit, completeDate = '1999-12-31') => {
    return mapper.property
        .findAll({
            attributes: ['propertyIdx','propertyTitle',`targetAmount`,'typeIdx','delFlag',
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('startDate'), '%Y-%m-%d'), 'startDate'],
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('completeDate'), '%Y-%m-%d'), 'completeDate']
            ],
            include: [{
                model: mapper.depositList,
                where: {
                    targetType : {$col: 'property.typeIdx'}
                },
                required: false
            }],
            where: {
                userIdx: { $and :[userIdx] },
                delFlag: { $ne :['Y'] },
                completeDate: { $gt : completeDate }
            },
            limit: limit
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
};

exports.findPropertyInfoM = (propertyIdx, userIdx) => {
    return mapper.property
        .findOne({
            attributes: ['propertyIdx','propertyTitle',`targetAmount`,'typeIdx','delFlag',
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('startDate'), '%Y-%m-%d'), 'startDate'],
                [mapper.sequelize.fn('date_format', mapper.sequelize.col('completeDate'), '%Y-%m-%d'), 'completeDate']
            ],
            include: [{
                model: mapper.depositList,
                attributes : [
                    'depositIdx', 'targetIdx', 'depositAmount', 'delFlag',
                    [mapper.sequelize.fn('date_format', mapper.sequelize.col('depositDate'), '%Y-%m-%d'), 'depositDate'],
                ],
                where: {
                    targetType : {$col: 'property.typeIdx'}
                },
                required: false
            }],
            where: {
                userIdx: { $and :[userIdx] },
                delFlag: { $ne :['Y'] },
                propertyIdx: { $and :[propertyIdx] }
            }
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
};

exports.getCurrentTotalPropertyMoneyM = (userIdx) =>{
    return mapper.property.sequelize.query('SELECT CONVERT( SUM( d.depositAmount ), UNSIGNED ) as totalMoney, p.typeIdx ' +
                        'FROM property as p ' +
                        'LEFT JOIN depositList as d ON p.propertyIdx = d.targetIdx and p.typeIdx = d.targetType ' +
                        'WHERE p.propertyIdx > 0 AND p.delFlag = "N" AND p.userIdx = :userIdx and NOW() BETWEEN p.startDate and p.completeDate ' +
                        'GROUP BY p.typeIdx',
                        { replacements: { userIdx: userIdx }, type: mapper.property.sequelize.QueryTypes.SELECT })
                .then((results)=>{return results;})
                .catch((error)=>{console.log(error);return null;});
};

exports.getPropertyStatusM = (userIdx, month) =>{
    return mapper.property.sequelize
        .query('SELECT CONVERT( SUM( d.depositAmount ), UNSIGNED) as totalAmount , :month as date  '+
               'FROM property as p ' +
               'LEFT JOIN depositList as d ON p.propertyIdx = d.targetIdx and p.typeIdx = d.targetType ' +
               'WHERE p.propertyIdx > 0  AND p.userIdx = :userIdx AND  ' +
               '( (p.delFlag  = "N" AND DATE_FORMAT(d.depositDate,"%Y-%m") <= :month) ||  (p.delFlag = "C" and DATE_FORMAT(p.completeDate,"%Y-%m")  >= :month AND  DATE_FORMAT(d.depositDate,"%Y-%m") < :month) ) '
                ,{replacements:{userIdx: userIdx, month: month},type: mapper.property.sequelize.QueryTypes.SELECT})
        .then((results)=>{return results;})
        .catch((error)=>{console.log(error);return null;})
};

exports.createPropertyM = (propertyInfo, propertyType, userIdx) => {
    return mapper.property
        .create({
            propertyTitle : propertyInfo.propertyTitle,
            targetAmount : propertyInfo.targetAmount,
            completeDate : propertyInfo.completeDate,
            typeIdx : propertyType,
            userIdx : userIdx
        })
        .then(function(results) {
            return results.propertyIdx;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
};


exports.deletePropertyM = (propertyIdx, userIdx) => {
    return mapper.property
        .update(
            {
                delFlag : 'Y'
            },
            {
                where: {
                   propertyIdx: propertyIdx,
                   userIdx: userIdx
                }
            }

        )
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
};

exports.updatePropertyStatusM = function (propertyIdx, userIdx, status) {
    return mapper.property
        .update(
            {
                delFlag : status
            },
            {
                where: {
                    propertyIdx: propertyIdx,
                    userIdx: userIdx
                }
            }

        )
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
            return 0;
        });
};