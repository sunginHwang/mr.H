import { NON_LOGIN, ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
/*남은 일수 구하기*/
export const getRemainDate = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    const remainDate= (convertEndDate.getTime() - convertStartDate.getTime())/(1000*60*60*24);
    return remainDate > 0 ? remainDate
                          : 0;
};
/*두 날짜 간 남은 달수 계산*/
export const getRemainMonth = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    return (convertEndDate.getFullYear() - convertStartDate.getFullYear())*12 + convertEndDate.getMonth() - convertStartDate.getMonth();
};

/*시작일 ~ 종료일까지의 퍼센티지 구하기*/
export const getRemainDatePercentage = (startDate, endDate) =>{
    const today = new Date();
    const totalDateCount = getRemainDate(startDate,endDate);
    const passDateCount = getRemainDate(startDate,today);
    const remainDate = (passDateCount / totalDateCount) * 100;
    return parseInt(remainDate,10);
};

/*오늘보다 큰 날짜인지 계산*/
export const isBiggerThenToday = (date) => {
    const today = new Date();
    const convertDate = new Date(date);
    return convertDate.getTime() <= today.getTime();
};

/*오늘날짜 yyyy-mm-dd 구하기*/
export const getTodayForYYYYMMDD = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1; //January is 0!
    var year = today.getFullYear();

    if(day<10)
        day='0'+day;

    if(month<10)
        month='0'+month;

    return year+"-"+month+"-"+day;
};

/*이메일 형식 검사*/
export const checkEmailReg = (emailValue) => {
    const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!emailReg.test(emailValue))
        return false;
    else
        return true;
};

/*다음달 날짜 구하기*/
export const getNextMonthDate = () =>{
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth()+2;
    let date = today.getDate();
    month = (month+'').length < 2 ? '0'+month : month;
    date = (date+'').length < 2 ? '0'+date : date;
    return year+'-'+month+'-'+date;
};

/*숫자에 콜론 붙여주기*/
export const comma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/*한달 월 적금액 구하기*/
export const calcMonthlyDepositMoney = (targetMoney, dueDate) => {
    const today = new Date();
    return parseInt(targetMoney / getRemainMonth(today,dueDate));
};

/*로그인 여부 검사*/
export const isLogin = (userIdx) => {
    return userIdx != NON_LOGIN;
};

/*토큰정보 저장*/
export const saveTokenInfo = (token, refreshToken) => {
     localStorage.setItem(ACCESS_TOKEN, token);
     localStorage.setItem(REFRESH_TOKEN, refreshToken);
};
/*토큰정보 삭제*/
export const deleteTokenInfo = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

/*에러 메세지 공통 처리*/
export const getErrorMsg = (errorMsg) => {
    if(errorMsg == undefined || errorMsg == null || errorMsg == '')
        return '잠시후 다시 시도해 주세요.';
    else
        return errorMsg;
};
