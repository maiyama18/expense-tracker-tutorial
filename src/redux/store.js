import { createStore, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import rootReducer, { initialState } from './reducers'
import firebaseConfig from '../firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableLogging: true,
  }),
]

const composedEnhancers = compose(...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store