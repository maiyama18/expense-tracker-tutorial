import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AddCategory from './AddCategory'
import { selectCategory } from '../redux/categories'

class CategoryList extends Component {
  render() {
    const { categories, selectedCategory } = this.props
    const { selectCategory } = this.props

    return (
      <div>
        <div>
          {categories.map(category => (
            <div 
              key={category}
              style={{background: category === selectedCategory ? '#988afe' : '#ffffff'}}
              onClick={() => selectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <AddCategory />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { uid } = state.firebase.auth
  const { selectedCategory } = state.categories
  const categories = state.firestore.ordered.categories 
    ? state.firestore.ordered.categories.map(c => c.name)
    : []

  return {
    uid,
    categories, 
    selectedCategory,
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    selectCategory,
  }, dispatch),
})

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