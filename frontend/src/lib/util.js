/*남은 일수 구하기*/
export const getRemainDate = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    return (convertEndDate.getTime() - convertStartDate.getTime())/(1000*60*60*24);
}

/*이메일 형식 검사*/
export const checkEmailReg = (emailValue) => {
    const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!emailReg.test(emailValue))
        return false;
    else
        return true;
}
