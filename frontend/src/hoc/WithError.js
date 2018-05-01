import React from 'react';
import ErrorBlock from 'components/common/Block/ErrorBlock';

export default function WithError(WrappedComponent) {
    return class Error extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                errorMessage: ''
            };
            this.withSetErrorMessage = this.withSetErrorMessage.bind(this);
        }

        withSetErrorMessage(errorMsg) {
            const timer = 800;
            this.setState({errorMessage: errorMsg});
            setTimeout(() =>  this.setState({errorMessage: ''}), timer);
        }

        render() {
            const { errorMessage } = this.state;

            return <div className='withError'>
                        <ErrorBlock
                            errorMessage={errorMessage}
                            position='top'/>
                        <WrappedComponent {...this.props} withSetErrorMessage={this.withSetErrorMessage} />
                   </div>
        }
    };
}