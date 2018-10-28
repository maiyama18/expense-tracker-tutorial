export const categoriesInitialState = {
  selectedCategory: null,
}

const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: {
    category,
  },
})

export const categoriesReducer = (state = categoriesInitialState, action) => {
  switch (action.type) {
  case SELECT_CATEGORY:
    return {
      ...state,
      selectedCategory: action.payload.category,
    }
  default:
    return state
  }
}