import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Student = ({student, campus}) => {
  if(!student.id){
    return '...loading student';
  }
  return (
    <div>
      <h3>Student details for {student.name}</h3>
      <br />
      <ul>
        <li key = {student.id}>
          <img key ={student.id} src={student.imageUrl} />
          <h4>First Name: {student.firstName}</h4>
          <h4>Last Name: {student.lastName}</h4>

          <h4>Campus: {campus ? <Link to={`/campuses/${campus.id}`}> {campus.name} </Link>: 'Currently Not Enrolled' }</h4>

          <h4>Email: {student.email}</h4>
          <h4>GPA: {student.gpa}</h4>
          <Link to={`/students/${student.id}/update`}>UPDATE</Link>
        </li>
      </ul>
    </div>
  )
}

export default connect(
  (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    const campus = state.campuses.find(campus => campus.id === student.campusId * 1)
    return {
      student,
      campus
    }
  },
    null
)(Student)
