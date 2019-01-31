import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withEmailVerification } from '../Session'
import { selectVisitors } from '../../reducers/visitors'
import { setVisitors } from '../../actions/visitorActions'
import BulmaSelect from '../common/BulmaSelect'

class VisitorSelect extends React.Component {
  componentDidMount () {
    const userId = this.props.authUser.uid
    this.unsubscribeVisitors = this.props.firebase
      .visitorsForUser(userId)
      .onSnapshot(snapshot => {
        let visitors = {}
        snapshot.forEach(doc => (visitors[doc.id] = { ...doc.data() }))
        this.props.onSetVisitors(visitors)
      })
  }

  componentWillUnmount () {
    this.unsubscribeVisitors()
  }

  render () {
    const { value, name, onChange, visitors } = this.props
      if( visitors.length === 0 ) {
        return "loading..."
      }
    return (
      <BulmaSelect
        name={name}
        label='Select Visitors Here'
        value={value}
        onChange={onChange}
        selectValues={visitors}

      />
    )
  }
}

const mapStateToProps = state => ({
  visitors: selectVisitors(state.visitors).map(visitor => ({
    value: visitor.uid,
    title: `${visitor.firstName} ${visitor.lastName}`
  }))
})

const mapDispatchToProps = dispatch => ({
  onSetVisitors: visitors => dispatch(setVisitors(visitors))
})

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withEmailVerification
)(VisitorSelect)
