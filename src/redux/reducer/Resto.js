const initialState = {
  result: [],
  isLoading: false,
  isError: false,
  isSuccess: true
}

const resto = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESTO_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_RESTO_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'GET_RESTO_FULFILLED':
      return {
        ...state,
        result: action.payload.data.data,
        isLoading: false,
        isError: false
      }
    case 'POST_RESTO_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'POST_RESTO_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'POST_RESTO_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'PUT_RESTO_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'PUT_RESTO_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'PUT_RESTO_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'DELETE_RESTO_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'DELETE_RESTO_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'DELETE_RESTO_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'PUTIMAGE_RESTO_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }

    default:
      return state
  }
}

export default resto