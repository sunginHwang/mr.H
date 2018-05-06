import React from 'react';
import './TotalMoneyForm.css';


const TotalMoneyForm = ({money}) => {
    return (
        <div>
            <div style={{marginLeft:'0.5em'}}>
                <div>
                    <span className='total-label'>총 자산</span>
                    <span className='total-label-side'>(적금 + 예금)</span>
                </div>
                <div className='total-form-content'>
                    <div className='total-money-form'>
                        <span className='money'>{money}</span>
                        <span className='won'> 원</span>
                    </div>
                </div>
            </div>
            <div style={{clear:'both'}}></div>
        </div>

    );
};

export default TotalMoneyForm;