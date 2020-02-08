const initialState = {
  result: [],
  info: [],
  isLoading: false,
  isError: false,
  isSuccess: true
}

const restoitems = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEMS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_ITEMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'GET_ITEMS_FULFILLED':
      return {
        ...state,
        result: action.payload.data.result,
        info: action.payload.data.info,
        isLoading: false,
        isError: false
      }
    
    case 'POST_ITEMS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'POST_ITEMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'POST_ITEMS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'PUT_ITEMS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'PUT_ITEMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'PUT_ITEMS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'DELETE_ITEMS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'DELETE_ITEMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'DELETE_ITEMS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case 'PUTIMAGE_ITEMS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'PUTIMAGE_ITEMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'PUTIMAGE_ITEMS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false
      }

    default:
      return state
  }
}

export default restoitems