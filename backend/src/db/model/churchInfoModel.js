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
