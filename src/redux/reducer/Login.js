const initialState = {
  result: [],
  isLoading: false,
  isError: false,
  isSuccess: true
}

const login = (state = initialState, action) => {
  switch (action.type) {

    case 'POST_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'POST_LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'POST_LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }

    default:
      return state
  }
}

export default login