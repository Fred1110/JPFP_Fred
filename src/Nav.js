import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCampus} from './store';

const Nav = ({ campuses, students })=> {
  return(
      <nav>
          <Link to='/' >HOME</Link>
          <Link to='/campuses'>CAMPUSES ({campuses.length})</Link>
          <Link to='/students'>STUDENTS ({students.length})</Link>
          <Link to='/campuses/create'>CREATE CAMPUSE</Link>
      </nav>
  )
}


export default connect(
  state => state,
  null
)(Nav);
