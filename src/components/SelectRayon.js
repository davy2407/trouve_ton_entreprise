import React from 'react';



class SelectRayon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.onRayon(this.state.value)
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Rayon de recherche : 
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="">Choisir Rayon</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
              <option value="100">100 km</option>
              
            </select>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      );
    }
  }


  export default SelectRayon;