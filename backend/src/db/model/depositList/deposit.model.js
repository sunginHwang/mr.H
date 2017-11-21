import mapper from '../../mapper';

exports.createDepositM = (depositInfo) => {
    return mapper.depositList
        .create(depositInfo)
        .then(function(results) {
            return results.bckIdx;
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.findTargetType = (targetIdx) => {
    return mapper.commonType
        .findOne({
            where: {
                typeIdx: { $and :[targetIdx] },
            }
        })
        .then(function(results) {
            return results;
        })
        .catch(function(err) {
            console.log(err);
        });
};
