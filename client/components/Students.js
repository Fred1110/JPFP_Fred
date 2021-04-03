import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {destroyStudent} from './effects';

const Students = ({students, destroy}) => {
 return(
   <ul>
     <Link to='/students/create'><h3>CREATE STUDENT</h3></Link>
     {
       students.map(student=> {
         return(
           <li key = {student.id}>
             <Link to={`/students/${student.id}`}>
             <img key = {student.id} src={student.imageUrl}/>
             <h2>{student.firstName}</h2>
               </Link>
              <button onClick={()=> destroy(student)}>X</button>
           </li>
         )
       })
     }
   </ul>
 )
}

export default connect(
  ({students}) => ({students}),
  (dispatch, {history}) => {
    return{
      destroy: (student) => dispatch(destroyStudent(student, history))
    }
  }
)(Students)
