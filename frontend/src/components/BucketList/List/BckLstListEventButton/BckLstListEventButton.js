import React from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './BckLstListEventButton.css';

const BckLstListEventButton = ({bckIdx, onDepositClick, onDeleteClick}) => {

    return(
        <div className="ListEventWrap">
            <Button className="deposit-button"
                    onClick={()=>onDepositClick(bckIdx)}
                    basic
                    color='blue'
                    size='mini'>입력{bckIdx}
            </Button>
            <Button onClick={onDeleteClick}
                    basic
                    color='red'
                    size='mini'>삭제
            </Button>
        </div>
    );
};
export default BckLstListEventButton;