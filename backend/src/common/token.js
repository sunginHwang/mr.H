import jwt from 'jsonwebtoken';
import { ACCESS_MODE , REFRESH_MODE, ACCESS_HEADER_TOKEN } from './constants';
import { SECRET_TOKEN_KEY, HASH_ALGORITHM, EXPIRE_DATE } from './tokenKeyInfo';
import { tokenGenerator } from './token';



exports.tokenGenerator = (tokenType = ACCESS_MODE, userInfo) => {
    const expireTime =  tokenType == REFRESH_MODE ? EXPIRE_DATE * 2 : EXPIRE_DATE;

    return  jwt.sign(
        {
            userId : userInfo.userId,
            userIdx: userInfo.userIdx,
            userName: userInfo.userName
        },
        SECRET_TOKEN_KEY,
        {
            algorithm: HASH_ALGORITHM,
            expiresIn: expireTime
        }
    );
};

exports.refreshTokenGenerator = ( refreshToken ) => {
    const refreshTokenInfo =  jwt.verify(refreshToken, SECRET_TOKEN_KEY,(err, userInfo) => {
        if(err){
            return null;
        }else{
            const newAccessToken = tokenGenerator(ACCESS_MODE, userInfo);
            const newRefreshToken = tokenGenerator(REFRESH_MODE, userInfo);
            return{
                userInfo : userInfo,
                accessToken : newAccessToken,
                refreshToken : newRefreshToken
            }
        }
    });

    return refreshTokenInfo;
};


exports.isAuthenticated = async(req, res, next) => {
    
    const token = req.headers[ACCESS_HEADER_TOKEN] || req.query.token;
    // token does not exist
    if(!token) {
        return res.status(401).json({
            success: false,
            errorMsg: '로그인정보가 사라졌습니다. 다시 로그인해주세요.'
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
            errorMsg: '로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.'
        })
    }else{
        req.userInfo = validateToken;
        next();
    }

};
