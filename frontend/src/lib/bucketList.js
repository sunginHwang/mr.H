import { MONEY_COMPLETE, PROCEEDING, COMPLETE } from 'lib/constants';
import { isBiggerThenToday } from 'lib/util';

/*버킷리스트들의 타입 별 나누기*/
export const filterBckListForCompleteType = (bckList, completeType) => {
    let resultList = '';
    if( completeType === PROCEEDING){
        resultList =  bckList.filter(bckInfo => bckInfo.completeType === MONEY_COMPLETE ?
                                                  bckInfo.currentAmount < bckInfo.targetAmount :
                                                  !isBiggerThenToday(bckInfo.completeDate));
    }

    if( completeType === COMPLETE){
        resultList = bckList.filter(bckInfo => bckInfo.completeType === MONEY_COMPLETE ?
                                               bckInfo.currentAmount < bckInfo.targetAmount :
                                               !isBiggerThenToday(bckInfo.completeDate));
    }

    return resultList;
};
