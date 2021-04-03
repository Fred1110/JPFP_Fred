import React, {Component} from 'react';
import {connect} from 'react-redux';
import {unregisterStudent} from './effects';

class Unregister extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {campusId, id, unregister} = this.props;
    return (
      <button onClick ={() => unregister(id, campusId)}>Unregister</button>
    )
  }
}

export default connect (
  null,
  (dispatch) => {
    return {
      unregister: (id, campusId) => dispatch(unregisterStudent(id, campusId))
    }
  }
)(Unregister)
