import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../../db/model/user/user.model';
import util from '../../common/util';

const LocalStrategy = passportLocal.Strategy;


exports.setup = () => {
    passport.use(new LocalStrategy({
            usernameField: 'id',
            passwordField: 'password',
            session : false
        },
        async (id, password, done) => {
            // 인증 정보 체크 로직
            const userInfo = await userModel.findUserId(id);

            //ID 체크
            if(util.isEmptyJson(userInfo)){
                return done(null, false, { errorMsg: '존재하지 않는 아이디 입니다.' });
            }

            // 비밀번호 체크
            if(userInfo.userPassword != password){
                return done(null, false, { errorMsg: '비밀번호가 다릅니다.' });
            }

            return done(null, userInfo);

        }
    ));
};