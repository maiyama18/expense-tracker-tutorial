import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  addCategory() {
    const { uid, firestore } = this.props
    const { text } = this.state

    firestore.add({
      collection: 'categories',
    }, {
      uid,
      name: text,
    })

    this.setState({ text: '' })
  }

  render() {
    const { uid } = this.props
    const { text } = this.state

    if (!uid) return null

    return (
      <div>
        <input 
          type="text"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <button onClick={e => this.addCategory()}>Add Category</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { uid } = state.firebase.auth

  return {
    uid,
  }
}
const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(AddCategory)