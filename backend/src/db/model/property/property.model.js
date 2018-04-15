import mapper from '../../mapper';


exports.getPropertyListM = (userIdx, limit, completeDate = '1999-12-31') => {
    return mapper.property
        .findAll({
            attributes: ['propertyIdx','propertyTitle',`targetAmount`,'typeIdx',
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
                delFlag: { $and :['N'] },
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
            attributes: ['propertyIdx','propertyTitle',`targetAmount`,'typeIdx',
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
                delFlag: { $and :['N'] },
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
        .query('SELECT CONVERT( SUM( d.depositAmount ), UNSIGNED) as totalAmount , DATE_FORMAT(depositDate,"%Y-%m") as date ' +
               'FROM property as p ' +
               'LEFT JOIN depositList as d ON p.propertyIdx = d.targetIdx and p.typeIdx = d.targetType ' +
               'WHERE p.propertyIdx > 0 AND p.delFlag = "N" AND p.userIdx = :userIdx ' +
               'AND CONCAT(YEAR(d.depositDate), LPAD(MONTH(d.depositDate),2,"0")) >= PERIOD_ADD(CONCAT(YEAR(NOW()),LPAD(MONTH(NOW()),2,"0")),- :month ) ' +
               'GROUP BY date',{replacements:{userIdx: userIdx, month: month},type: mapper.property.sequelize.QueryTypes.SELECT})
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
