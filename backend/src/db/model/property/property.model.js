import mapper from '../../mapper';


exports.getPropertyListM = (userIdx) => {
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
                delFlag: { $and :['N'] }
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


exports.deletePropertyM = (propertyIdx) => {
    return mapper.property
        .update(
            {delFlag : 'Y'},
            {where: {propertyIdx: propertyIdx}}
        )
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
};
