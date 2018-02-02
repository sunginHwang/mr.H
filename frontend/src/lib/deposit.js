export const getDepositTotalMoney = (depositList) =>{
    return depositList.filter((x)=>x.delFlag === 'N')
                      .reduce((prev, save) => prev + save.depositAmount, 0);
};