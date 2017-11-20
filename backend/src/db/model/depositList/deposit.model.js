import mapper from '../../mapper';

exports.createDepositM = (depositInfo) => {
    return mapper.depositList
        .create({
            depositInfo
        })
        .then(function(results) {
            return results.bckIdx;
        })
        .catch(function(err) {
            console.log(err);
        });
}
