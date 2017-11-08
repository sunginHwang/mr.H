import React from 'react';
import { Progress } from 'semantic-ui-react';
import ContentList from 'components/common/ContentList';
import 'semantic-ui-css/semantic.min.css';
import './ItemListForm.css';


const ItemListForm = ({
    title,
    type,
    percent,
    progressColor
}) => {
    return (
        <div>
            <ContentList
                left_title={title}
                right_title={type}>
                <div className='progress-area'>
                    <Progress percent={percent}
                              progress='percent'
                              size='small'
                              indicating
                              color={progressColor}/>
                </div>

            </ContentList>
        </div>
    );
};

export default ItemListForm;