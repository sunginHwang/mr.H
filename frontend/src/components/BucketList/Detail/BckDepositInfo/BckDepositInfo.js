import React from 'react';
import './BckDepositInfo.css';

const BckDepositInfo = ({
    depositList
}) => {

    const depositRowList = depositList.map((depositInfo) => (
        <tr key={depositInfo.depositIdx}>
            <td className="deposit-date">{depositInfo.depositDate} : </td>
            <td className="deposit-amount">{depositInfo.depositAmount}</td>
        </tr>
    ));

  return (
    <table className="bck-detail-deposit-table">
        <colgroup>
            <col width="50%"/>
            <col width="*"/>
        </colgroup>
        <thead>
            <tr>
                <th>입금일</th>
                <th>입금액</th>
            </tr>
        </thead>
        <tbody>
        {depositRowList}
        </tbody>
    </table>
  );
};
 
export default BckDepositInfo;