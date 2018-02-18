import wrapAsync from 'express-wrap-async';
import passport from 'passport';
import tokenHelper from '../../common/token';
import { ACCESS_MODE , REFRESH_MODE } from '../../common/constants';
import { SECRET_TOKEN_KEY } from '../../common/tokenKeyInfo';
import passportSetting from '../passport/passport';
import authService from './auth.service';
import userModel from '../../db/model/user/user.model';
import jwt from "jsonwebtoken";


exports.login = wrapAsync( async (req, res, next) => {
    passportSetting.setup();

    //  패스포트 모듈로 인증 시도
    passport.authenticate('local', function (err, user, info) {
        const error = err || info;
        if (error) return res.json(401, {errorMsg : '로그인 요청이 올바르지 않습니다.'});
        if (!user) return res.json(404, {errorMsg: '잘못된 요청입니다.'});
        //토큰 저장
        const token = tokenHelper.tokenGenerator(ACCESS_MODE, user);
        const refreshToken = tokenHelper.tokenGenerator(REFRESH_MODE, user);

        res.json({
            accessToken: token,
            refreshToken: refreshToken,
            userInfo: {
                userIdx : user.userIdx,
                userId : user.userId,
                userName : user.userName
            },
            msg : '로그인 성공'
        });
    })(req, res, next);

});

exports.findUser = wrapAsync( async (req, res) => {
    const userDate = await userModel.getUser();
    res.json({'test':userDate});
});

exports.register = wrapAsync( async (req, res) =>{
    const registerInfo = req.body;


    const userInfo = await authService.checkUserId(registerInfo.userId);

    if(userInfo){
        res.status(403).send({errorMsg : '존재하는 아이디 입니다.'});return;
    }

    const userIdx = await authService.userRegister(registerInfo);

    if(!userIdx){
        res.status(403).send({errorMsg : ' 회원가입 실패.'});return;
    }


    res.json({successMsg : '회원가입 성공.'});

});

exports.loadUserInfo = wrapAsync( async (req, res) =>{
    const { accessToken, refreshToken }  = req.query;

    const validateToken = await jwt.verify(accessToken, SECRET_TOKEN_KEY,(err, userInfo) => {

        if(err){
            if(err.name = 'TokenExpiredError'){
                return tokenHelper.refreshTokenGenerator(refreshToken);
            }else{
                return null;
            }
        } else{
            return {
                userInfo : userInfo,
                accessToken : accessToken,
                refreshToken : refreshToken
            };
        }

    });

    if(!validateToken){
        return res.status(403).json({
            success: false,
            errorMsg: '로그인정보가 사라졌습니다. 다시 로그인해주세요.'
        })
    }else{
        res.json({
            successMsg : '토큰인증 성공.',
            userInfo : {
                userIdx : validateToken.userInfo.userIdx,
                userId : validateToken.userInfo.userId,
                userName : validateToken.userInfo.userName
            },
            accessToken : validateToken.accessToken,
            refreshToken : validateToken.refreshToken
        });
    }



});
