export const getRemainDate = (startDate, endDate) => {
    const convertStartDate = new Date(startDate);
    const convertEndDate = new Date(endDate);
    return (convertEndDate.getTime() - convertStartDate.getTime())/(1000*60*60*24);
}