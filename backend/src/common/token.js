import jwt from 'jsonwebtoken';

const SECRET_TOKEN_KEY = 'sunginHwang';
const EXPIRE_DATE = 60 * 24 * 30 * 6; // 반년
const HASH_ALGORITHM = 'HS256';


exports.tokenGenerator = (userInfo) => {
    return  jwt.sign({userId : userInfo.userId,userIdx: userInfo.userIdx, userName: userInfo.userName}, SECRET_TOKEN_KEY, {
        algorithm: HASH_ALGORITHM,
        expiresIn: EXPIRE_DATE
    });
};

exports.isAuthenticated = async(req, res, next) => {
    
    const token = req.headers['x-user-token'] || req.query.token;

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    const validateToken = await jwt.verify(token, SECRET_TOKEN_KEY,(err, userInfo) => {

        if(err)
            return null;
        else
            return userInfo;
    });

    if(!validateToken){
        return res.status(403).json({
            success: false,
            message: 'not validate token'
        })
    }else{
        req.userInfo = validateToken;
        next();
    }

};
