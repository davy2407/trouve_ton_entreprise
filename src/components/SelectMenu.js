import React from 'react';



class SelectMenu extends React.Component {
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
      alert( "Secteur d'activité sélectionné :"  + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Choisissez un secteur d'activité : 
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="6201Z">Programmation informatique</option>
              <option value="6202A">Conseil en systèmes et logiciels informatiques</option>
              <option value="5911B">Production de films institutinnels et publicitaires</option>
              
            </select>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      );
    }
  }


  export default SelectMenu;