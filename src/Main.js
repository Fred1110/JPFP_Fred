import React, {Component} from 'react';
import {getCampuses, getStudents} from './store'
import {Switch, HashRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from './Nav';
import Campuses from './Campuses';
import Campus from './Campus';
import CampusUpdate from './CampusUpdate';
import CampusCreate from './CampusCreate'
import Students from './Students';
import Student from './Student'
import StudentUpdate from './StudentUpdate';
import StudentCreate from './StudentCreate';

const Home = () => {
  return <hr />
}


class Main extends Component {
  componentDidMount(){
    this.props.loadCampuses(),
    this.props.loadStudents()
  }
  render(){
    return (
      <Router>
        <div>
          <h1>
            TBBT CAMPUSES
            </h1>
            <Route path = '/'><Nav /></Route>

          <Switch>
            <Route path='/campuses' exact component = {Campuses} />
            <Route path = '/campuses/create' component = {CampusCreate} />
            <Route path='/students' exact component  = {Students} />
            <Route path = '/students/create' component = {StudentCreate} />
            <Route path = '/campuses/:id' exact component = {Campus} />
            <Route path='/students/:id' exact component = {Student} />
            <Route path = '/campuses/:id/update' component = {CampusUpdate} />
            <Route path='/students/:id/update' component = {StudentUpdate} />
          </Switch>

        </div>
      </Router>
    )
  }
};

const mapStateToProps = ({campuses, students}) => ({
  campuses,
  students
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampuses: () => dispatch(getCampuses()),
    loadStudents: () => dispatch(getStudents())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
