import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AddExpense from './AddExpense'

class ExpenseList extends Component {
  render() {
    const { expenses, selectedCategory } = this.props
    const { selectCategory } = this.props

    return (
      <div>
        hello
        <div>
          {expenses.map(category => (
            <div 
              key={category}
              style={{background: category === selectedCategory ? '#988afe' : '#ffffff'}}
              onClick={() => selectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <AddExpense />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    expenses: state.firestore.ordered.expenses 
      ? state.firestore.ordered.expenses
      : [],
    selectedCategory: state.categories.selectedCategory,
  }
}
const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid || !props.selectedCategory) return []
    return [
      {
        collection: 'expenses',
        where: [
          ['uid', '==', props.uid],
          ['category', '==', props.selectedCategory],
        ],
        orderBy: ['cost', 'desc'],
      },
    ]
  })
)(ExpenseList)