import wrapAsync from 'express-wrap-async';
import churchInfoModel from '../../db/model/churchInfoModel';


exports.paymentInfo = wrapAsync( async (req, res) => {
    const PaymentInfoList = await churchInfoModel.getPaymentInfoListM();


    if(PaymentInfoList.length === 0){
        res.status(403).send('납부내역이 없습니다.');return;
    }

    PaymentInfoList.map((info) => {
        if(info.method == 'C'){
            info.method = '현금';
        }else if(info.method == 'B'){
            info.method = '통장';
        }else if(info.method == 'D'){
            info.method = '카드';
        }
    });

    res.json(PaymentInfoList);
});
