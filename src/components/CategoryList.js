import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AddCategory from './AddCategory'

class CategoryList extends Component {
  render() {
    const { categories } = this.props

    return (
      <div>
        <div>
          {categories.map(category => (
            <div key={category}>{category}</div>
          ))}
        </div>
        <AddCategory />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { uid } = state.firebase.auth
  const categories = state.firestore.ordered.categories 
    ? state.firestore.ordered.categories.map(c => c.name)
    : []

  return {
    uid,
    categories, 
  }
}
const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid) return []
    return [
      {
        collection: 'categories',
        where: [
          ['uid', '==', props.uid],
        ],
      },
    ]
  })
)(CategoryList)