import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class AuthButton extends Component {
  render() {
    const { auth, firebase } = this.props

    if (!isLoaded(auth)) {
      return null
    }
    if (isEmpty(auth)) {
      return (
        <div>
          <button onClick={() => firebase.login({ provider: 'github', type: 'popup' })}>
            Log in with Github
          </button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={() => firebase.logout()}>
          Log out
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state.firebase

  return {
    auth,
  }
}
const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(AuthButton)