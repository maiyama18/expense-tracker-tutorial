import React, { Component } from 'react'
import { compose, connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddExpense extends Component {
  constructor(props) {
    super(props)
    this.state = { description: '', cost: 0 }
  }

  addExpense() {
    const { uid, selectedCategory, firestore } = this.props
    const { description, cost } = this.state

    firestore.add({
      collection: 'expenses',
    }, {
      uid,
      description,
      cost,
      category: selectedCategory,
    })

    this.setState({ cost: 0, description: '' })
  }

  render() {
    const { uid, selectedCategory } = this.props
    const { description, cost } = this.state

    if (!uid || !selectedCategory) return null

    return (
      <div>
        <input 
          type="text" 
          value={description}
          onChange={e => this.setState({ description: e.target.value })}
        />
        <input 
          type="number" 
          value={cost}
          step="0.01"
          onChange={e => this.setState({ cost: e.target.value })}
        />
        <button onClick={() => this.addExpense()}>Add Expense</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    selectedCategory: state.categories.selectedCategory,
  }
}
const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddExpense)