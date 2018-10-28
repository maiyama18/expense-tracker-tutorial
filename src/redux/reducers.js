import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { categoriesInitialState, categoriesReducer } from './categories'

export const initialState = {
  categories: categoriesInitialState,
}

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  categories: categoriesReducer,
})