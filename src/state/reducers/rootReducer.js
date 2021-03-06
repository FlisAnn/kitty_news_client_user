import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEWS_FEED':
      return {
        ...state,
        newsFeed: action.payload,
        specificArticle: {},
      }
    case 'VIEW_ARTICLE':
      return {
        ...state,
        specificArticle: action.payload,
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      }
    case 'REGISTER_ERROR_MESSAGE':
      return {
        ...state,
        registerErrorMessage: action.payload,
      }
    case 'OPEN_REGISTRATION_FORM':
      return {
        ...state,
        modalOpen: true,
      }
    case 'CLOSE_REGISTRATION_FORM':
      return {
        ...state,
        modalOpen: false,
      }
    case 'OPEN_LOGIN_FORM':
      return {
        ...state,
        logInModalOpen: true,
      }
    case 'CLOSE_LOGIN_FORM':
      return {
        ...state,
        logInModalOpen: false,
      }
    case 'OPEN_PAYMENT_FORM':
      return {
        ...state,
        paymentModalOpen: true,
      }
    case 'CLOSE_PAYMENT_FORM':
      return {
        ...state,
        paymentModalOpen: false,
      }
    case 'SET_PAYMENT_SUCCESS_MESSAGE':
      return {
        ...state,
        paymentSuccessMessage: action.payload,
        paymentErrorMessage: '',
      }
    case 'SET_PAYMENT_ERROR_MESSAGE':
      return {
        ...state,
        paymentErrorMessage: action.payload,
        paymentSuccessMessage: '',
      }
    case 'LOGIN_ERROR_MESSAGE':
      return {
        ...state,
        logInErrorMessage: action.payload,
      }
    case 'SET_LOG_OUT':
      return {
        ...state,
        currentUser: null,
      }
    default:
      return state
  }
}

export default rootReducer
