import wrapAsync from 'express-wrap-async';
import passport from 'passport';
import tokenHelper from '../../common/token';
import passportSetting from '../passport/passport';
import authService from './auth.service';
import userModel from '../../db/model/user/user.model';


exports.login = wrapAsync( async (req, res, next) => {
    passportSetting.setup();

    //  패스포트 모듈로 인증 시도
    passport.authenticate('local', function (err, user, info) {
        const error = err || info;
        if (error) return res.json(401, {errMsg : '로그인 요청이 올바르지 않습니다.'});
        if (!user) return res.json(404, {errMsg: '잘못된 요청입니다.'});
        //토큰 저장
        const token = tokenHelper.tokenGenerator(user);
        res.json({
            access_token: token,
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

