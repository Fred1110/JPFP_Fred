import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateStudent} from '../redux/effects';

class StudentUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.student.id ? this.props.student.firstName : '',
      lastName: this.props.student.id ? this.props.student.lastName : '',
      email: this.props.student.id ? this.props.student.email : '',
      gpa: this.props.student.id ? this.props.student.gpa : 0,
      error: ''
    }
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(prevProps){
    if(!prevProps.student.id && this.props.student.id){
      this.setState({firstName: this.props.student.firstName}),
      this.setState({lastName: this.props.student.lastName}),
      this.setState({email: this.props.student.email}),
      this.setState({gpa: this.props.student.gpa})
    }
  }

  async onSave(evt){
    evt.preventDefault();
    try {
      await this.props.update(this.props.student.id, this.state.firstName, this.state.lastName, this.state.email, this.state.gpa)
    } catch (error) {
      console.log(error)
      this.setState({error: error.response.data.error})
    }
  }

  onChange(evt){
    const change={};
    change[evt.target.name] = evt.target.value;
    this.setState(change)
  }

  render(){
    const {firstName, lastName, email, gpa, error} = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = {onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        First Name: <input name ='firstName' value = {firstName} onChange = {onChange} />
        Last Name: <input name ='lastName' value = {lastName} onChange = {onChange} />
        Email: <input name ='email' value = {email} onChange = {onChange} />
        GPA: <input name ='gpa' value = {gpa} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect (
  (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
    return {
      student
    };
  },
  (dispatch, {history}) => {
    return {
      update: (id, firstName, lastName, email, gpa) => dispatch(updateStudent(id, firstName, lastName, email, gpa, history))
    }
  }
)(StudentUpdate)
