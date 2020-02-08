const initialState = {
  result: [],
  isLoading: false,
  isError: false,
  isSuccess: true
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        result: action.payload.data.result,
        isLoading: false,
        isError: false
      }
    case 'POST_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'POST_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'POST_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'PUT_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'PUT_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'PUT_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'DELETE_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'DELETE_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'DELETE_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    default:
      return state
  }
}

export default users