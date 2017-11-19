import mapper from '../mapper';

exports.getPaymentInfoListM = () => {
    return mapper.payment
    .findAll({
        order: [['payDate', 'DESC']],
        limit : 2
    })
    .then(function(results) {
        return results;
    })
    .catch(function(err) {
        console.log(err);
    });
};

exports.testM = () => {
    return mapper.bucketList
        .findAll({
            attributes: ['bckIdx','bckTitle',`targetAmount`,'typeIdx',`startDate`,'completeDate',['depositIdx', 'targetIdx','depositDate','depositAmount']],
            include: [{
                    model: mapper.depositList,
                    where: {
                        targetIdx : {$col: 'bucketList.typeIdx'}
                    }
            }]
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};
