import mapper from '../../mapper';


exports.findUserId = (userId) => {
    return mapper.user
        .findOne({
            where : {
                userId : { $and :[userId] }
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

exports.checkPassword = (password) => {
    return mapper.user
        .findOne({
            where : {
                userPassword : { $and :[password] }
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