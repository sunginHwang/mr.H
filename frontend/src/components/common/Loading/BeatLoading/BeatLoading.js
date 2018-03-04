import React from 'react';
import { BeatLoader } from 'react-spinners';
import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import './BeatLoading.css';
const BeatLoading = ({loading}) => {
    return (
        loading &&
        <LoadingWrapper>
                <BeatLoader
                    loading={loading}
                    color={'#00BCD4'}
                />
        </LoadingWrapper>
    );
};
export default BeatLoading;

