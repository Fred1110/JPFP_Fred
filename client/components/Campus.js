//need more work on update
import React from 'react';
import {connect} from 'react-redux';
import {destroyCampus} from '../effects';
import {Link} from 'react-router-dom';
import Unregister from './Unregister'


const Campus = ({campus, student, destroy}) => {
  if(!campus.id){
    return '...loading campus'
  }

  return(
    <div >
      <img key={campus.id} src={campus.imageUrl} />
      <h2>{campus.name}</h2>
      <br />
      <h3>Address: {campus.address}</h3>
      <h3>Description: {campus.description}</h3>
      <h3>Students:
        <ul>
          {student.length ? student.map( std => {
            return(
              <li key = {std.id}>
                <Link to={`/students/${std.id}`}>
                  {std.firstName} {std.lastName}
                  </Link>
                  <Unregister campusId = {campus.id} id = {std.id} />
              </li>
              )
            }) : 'Currently No Student'
          }
          </ul>
        </h3>
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
    const student = state.students.filter( student => student.campusId === campus.id) || {};
    return {campus, student}
  },
  (dispatch, {history}) => {
    return {
      destroy: (campus) => dispatch(destroyCampus(campus, history)),
    }
  }
)(Campus)
