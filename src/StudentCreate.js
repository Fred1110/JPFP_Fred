import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from './store';

class StudentCreate extends Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email:'',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this. onSave = this.onSave.bind(this);
  }

  onChange(evt){
    const change = {};
    change[evt.target.name] = evt.target.value;
    this.setState(change);
  }

  async onSave(evt){
    evt.preventDefault();
    try {
      await this.props.create(this.state.firstName);
      await this.props.create(this.state.lastName);
      await this.props.create(this.state.email);
    } catch (error) {
      console.log({error: error.response.data.error})
    }
  }

  render(){
    const { firstName, lastName, email, error } = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = { onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        <input name = 'firsName' value = {firstName} onChange = {onChange} />
        <input name = 'lastName' value = {lastName} onChange = {onChange} />
        <input name = 'lastName' value = {email} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect(
  null,
  (dispatch, {history}) => {
    return {
      createFirstName: (firstName) => dispatch(createStudent(firstName, history)),
      createLastName: (lastName) => dispatch(createStudent(lastName, history)),
      createEmail: (email) => dispatch(createStudent(email, history))
    }
  }
  )(StudentCreate);
