import React from 'react';
import { Button } from 'semantic-ui-react';
import { MONEY_COMPLETE } from 'lib/constants';
import 'semantic-ui-css/semantic.min.css';
import './BckListEventButton.css';

const BckListEventButton = ({
    bckIdx,
    toggleMode,
    completeType,
    onDepositClick,
    onDeleteClick
}) => {

    return(
        <div className='ListEventWrap'>
            {
                (toggleMode === 'proceeding' && completeType === MONEY_COMPLETE) &&
                    <Button className='deposit-button'
                            onClick={onDepositClick}
                            basic
                            color='blue'
                            size='mini'>입력
                    </Button>
            }
            <Button onClick={onDeleteClick}
                    basic
                    color='red'
                    size='mini'>삭제
            </Button>
        </div>
    );
};
export default BckListEventButton;