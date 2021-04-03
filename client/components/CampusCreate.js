import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../redux/effects';
import {Link} from 'react-router-dom';

class CampusCreate extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      address: '',
      description:'',
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
      await this.props.create(this.state.name, this.state.address, this.state.description);
    } catch (error) {
      console.log(error)
      this.setState({error: error.response.data.error})
    }
  }

  render(){
    const { name, address, description, error } = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = { onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        Campus Name: <input name = 'name' value = {name} onChange = {onChange} />
        Campus Address: <input name = 'address' value = {address} onChange = {onChange} />
        Description: <input name = 'description' value = {description} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect(
  null,
  (dispatch, {history}) => {
    return {
      create: (name, address, description) => dispatch(createCampus(name, address, description, history))
    }
  }
  )(CampusCreate);
