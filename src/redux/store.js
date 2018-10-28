import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import rootReducer, { initialState } from './reducers'
import firebaseConfig from '../firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const middlewares = []
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true,
  }),
  applyMiddleware(...middlewares),
]

const composedEnhancers = compose(...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store