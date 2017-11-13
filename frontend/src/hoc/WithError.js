import React, { Component} from 'react';
import ErrorBlock from 'components/common/Block/ErrorBlock';

export default function WithError(WrappedComponent) {
    return class Error extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                errorMessage: ''
            };
            this.setErrorMessage = this.setErrorMessage.bind(this);
        }

        setErrorMessage(errorMsg) {
            const timer = 800;
            this.setState({errorMessage: errorMsg});
            setTimeout(() =>  this.setState({errorMessage: ''}), timer);
        }

        render() {
            const { errorMessage } = this.state;

            return <div className='withError'>
                        <ErrorBlock
                            errorMessage={errorMessage}
                            positon='top'/>
                        <WrappedComponent {...this.props} setErrorMessage={this.setErrorMessage} />;
                   </div>
        }
    };
}