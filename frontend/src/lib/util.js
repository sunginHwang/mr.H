/*남은 일수 구하기*/
export const getRemainDate = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    return (convertEndDate.getTime() - convertStartDate.getTime())/(1000*60*60*24);
}
/*두 날짜 간 남은 달수 계산*/
export const getRemainMonth = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    return (convertEndDate.getFullYear() - convertStartDate.getFullYear())*12 + convertEndDate.getMonth() - convertStartDate.getMonth();
}

/*시작일 ~ 종료일까지의 퍼센티지 구하기*/
export const getRemainDatePercentage = (startDate, endDate) =>{
    const today = new Date();
    const totalDateCount = getRemainDate(startDate,endDate);
    const passDateCount = getRemainDate(startDate,today);
    const remainDate = (passDateCount / totalDateCount) * 100;
    return parseInt(remainDate,10);
}

/*오늘보다 큰 날짜인지 계산*/
export const isBiggerThenToday = (date) => {
    const today = new Date();
    const convertDate = new Date(date);
    return convertDate.getTime() <= today.getTime();
}

/*이메일 형식 검사*/
export const checkEmailReg = (emailValue) => {
    const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!emailReg.test(emailValue))
        return false;
    else
        return true;
}

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
}
