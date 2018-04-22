import React from 'react';

export default function WithAuthCheck(WrappedComponent) {
    return class AuthCheck extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount(){
            this.withAccessTokenCheck();
        }

        withAccessTokenCheck = async () => {
            const accessToken = localStorage.getItem('_MRH_USER_');
            if(!accessToken){
                await alert('해당 서비스는 로그인이 필요합니다.');
                await this.props.history.push('/login');
            }
        };

        render() {
            return <div className='withAuthCheck'>
                     <WrappedComponent {...this.props} />
                  </div>
        }
    };
}