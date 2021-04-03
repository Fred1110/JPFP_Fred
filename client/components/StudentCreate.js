import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../redux/effects';
import {Link} from 'react-router-dom';

class StudentCreate extends Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email:'',
      gpa: 0,
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(evt){
    const change = {};
    change[evt.target.name] = evt.target.value;
    this.setState(change);
  }

  async onSave(evt){
    evt.preventDefault();
    try {
      await this.props.create(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa);
    } catch (error) {
      this.setState({error: error.response.data.error})
    }
  }

  render(){
    const { firstName, lastName, email, gpa, error } = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = { onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        First Name:<input name = 'firstName' value = {firstName} onChange = {onChange} />
        Last Name:<input name = 'lastName' value = {lastName} onChange = {onChange} />
        Email: <input name = 'email' value = {email} onChange = {onChange} />
        GPA: <input name = 'gpa' value = {gpa} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect(
  null,
  (dispatch, {history}) => {
    return {
      create: (firstName, lastName, email, gpa) => dispatch(createStudent(firstName, lastName, email, gpa, history))
    }
  }
  )(StudentCreate);
