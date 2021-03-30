//need more work on update
import React from 'react';
import {connect} from 'react-redux';
import {destroyCampus, getCampuses} from './store';
import {Link} from 'react-router-dom';

const Campus = ({campus, destroy}) => {
  if(!campus.id){
    return '...loading campus'
  }
  return(
    <div >
      <img key={campus.id} src={campus.imageUrl} />
      <h2>{campus.name}</h2>
      <br />
      <h3>{campus.address}</h3>
      <h3>Description: {campus.description}</h3>
      <Link to={'/campuses'}>
      <button onClick={() => destroy(campus)}>Delete</button>
      </Link>
      <Link to ={`/campuses/${campus.id}/update`}>UPDATE</Link>
    </div>
  )
}

export default connect(
  (state, otherProps) => {
    const campus = state.campuses.find( campus => campus.id === otherProps.match.params.id * 1) || {};
    return {campus}
  },
  (dispatch, {history}) => {
    return {
      destroy: (campus) => dispatch(destroyCampus(campus, history))
    }
  }
)(Campus)
