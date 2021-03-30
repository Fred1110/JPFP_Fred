//need more work on update
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCampus} from './store';

class CampusUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus.id ? this.props.campus.name : '',
      imageUrl: this.props.campus.id ? this.props.campus.imageUrl : '',
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
      this.setState({imageUrl: this.props.campus.imageUrl}),
      this.setState({address: this.props.campus.address}),
      this.setState({description: this.props.campus.description})
    }
  }

  async onSave(evt){
    evt.preventDefault();
    try {
      await this.props.update(campus)
    } catch (error) {
      this.setState({error: error.response.data.error})
    }
  }

  onChange(evt){
    const change={};
    change[evt.target.name] = evt.target.value;
    this.setState(change)
  }

  render(){
    const {name, imageUrl, address, description, error} = this.state;
    const {onChange, onSave} = this;
    return (
      <form onSubmit = {onSave}>
        <pre>
          {
            !!error && JSON.stringify(error, null, 2)
          }
        </pre>
        <input name ='name' value = {name} onChange = {onChange} />
        <input name ='imageUrl' value = {imageUrl} onChange = {onChange} />
        <input name ='address' value = {address} onChange = {onChange} />
        <input name ='description' value = {description} onChange = {onChange} />
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
  (dispatch) => {
    return {
      update: (campus) => dispatch(updateCampus(campus))
    }
  }
)(CampusUpdate);
