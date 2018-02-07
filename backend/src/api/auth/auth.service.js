import userModel from '../../db/model/user/user.model';
import { passwordHash } from '../../common/util';


exports.checkUserId =  async (userId) => {
    const userInfo = await userModel.findUserId(userId);
    return userInfo;
};

exports.userRegister = async (userInfo) => {
  let userJoinInfo = userInfo;
  userJoinInfo.userPassword = await passwordHash(userJoinInfo.userPassword);

  const userIdx = await userModel.registerUserM(userJoinInfo);

  return userIdx;
};


exports.validPassword = async (LoginPassword, userPassowrd) => {
     return  LoginPassword == await passwordHash(userPassowrd);
};