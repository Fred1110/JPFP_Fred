import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCampus} from './store';

class CampusCreate extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      address: '',
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
      await this.props.create(campus);
    } catch (error) {
      console.log({error: error.response.data.error})
    }
  }

  render(){
    const { name, address, error } = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = { onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        <input name = 'name' value = {name} onChange = {onChange} />
        <input name = 'address' value = {address} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect(
  null,
  (dispatch) => {
    return {
      create: (campus) => dispatch(createCampus(campus))
    }
  }
  )(CampusCreate);
