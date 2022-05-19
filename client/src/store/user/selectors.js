const getUsername = state => state.getIn(['user', 'username']);
const getEmail = state => state.getIn(['user', 'email']);
const getIsLoginLoading = state => state.getIn(['user', 'isLoginLoading']);
const getIsSignupLoading = state => state.getIn(['user', 'isSignupLoading']);
const getErrorMessage = state => state.getIn(['user', 'errorMessage']);

export {
    getUsername,
    getEmail,
    getIsLoginLoading,
    getIsSignupLoading,
    getErrorMessage
}