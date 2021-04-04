import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Student = ({student, campus}) => {
  if(!student.id){
    return '...loading student';
  }
  return (
    <div>
      <h2>Student details for {student.name}</h2>
      <br />
      <ul>
        <li key = {student.id}>
          <img key ={student.id} src={student.imageUrl} />
          <h3>First Name: {student.firstName}</h3>
          <h3>Last Name: {student.lastName}</h3>

          <h3>Campus: {campus ? <Link to={`/campuses/${campus.id}`}> {campus.name} </Link>: 'Currently Not Enrolled' }</h3>

          <h3>Email: {student.email}</h3>
          <h3>GPA: {student.gpa}</h3>
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
