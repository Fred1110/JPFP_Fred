//need more work on update
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCampus} from '../redux/effects';
import {Link} from 'react-router-dom';

class CampusUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus.id ? this.props.campus.name : '',
      address: this.props.campus.id ? this.props.campus.address : '',
      description: this.props.campus.id ? this.props.campus.description : '',
      error: ''
    }
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  componentDidUpdate(prevProps){
    if(!prevProps.campus.id && this.props.campus.id){
      this.setState({name: this.props.campus.name}),
      this.setState({address: this.props.campus.address}),
      this.setState({description: this.props.campus.description})
    }
  }

  async onSave(evt){
    evt.preventDefault();
    try {
      await this.props.update(this.props.campus.id, this.state.name, this.state.address, this.state.description)
    } catch (error) {
      console.log(error);
      this.setState({error: error.response.data.error})
    }
  }

  onChange(evt){
    const change={};
    change[evt.target.name] = evt.target.value;
    this.setState(change)
  }

  render(){
    const {name, address, description, error} = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = {onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        Campus Name:<input name ='name' value = {name} onChange = {onChange} />
        New Address:<input name ='address' value = {address} onChange = {onChange} />
        Edit Description:<input name ='description' value = {description} onChange = {onChange} />
        <button>SAVE</button>
      </form>
    )
  }
}

export default connect (
  (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {};
    return {
      campus
    };
  },
  (dispatch, {history}) => {
    return {
      update: (id, name, address, description) => dispatch(updateCampus(id, name, address, description, history))
    }
  }
)(CampusUpdate);
