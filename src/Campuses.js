import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {destroyCampus} from './store';

const Campuses = ({campuses, destroy}) => {

  return(
   <ul className = 'campuses'>
     {
       campuses.map(campus => {
         return(
           <li key = {campus.id}>
             <Link to={`/campuses/${campus.id}`}>
               <img key = {campuses.id} src={campus.imageUrl}/>
               <h2>{campus.name}</h2>
               </Link>
              <button onClick={()=> destroy(campus)}>X</button>
           </li>
         )
       })
     }
   </ul>
 )
}

export default connect(
  ({campuses}) => ({campuses}),
  (dispatch, {history}) => {
    return{
      destroy: (campus) => dispatch(destroyCampus(campus, history))
    }
  }
)(Campuses)
