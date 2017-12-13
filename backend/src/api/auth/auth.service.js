import userModel from '../../db/model/user/user.model';


exports.checkUserId =  async (userId) => {
    const userInfo = await userModel.findUserId(userId);
    return userInfo;
};

exports.userRegister = async (userInfo) => {
  const userIdx = await userModel.registerUserM(userInfo);
  return userIdx;
};
