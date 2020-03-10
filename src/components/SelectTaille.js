import React from 'react';



class SelectTaille extends React.Component {
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
            sélection taille entreprise : 
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="">Tranche salarié</option>
              <option value="NN">Unités non employeuses (pas de salarié au cours de l'année de référence et pas d'effectif au 31/12). Cette tranche peut contenir quelques effectifs inconnus</option>
              <option value="00">0 salarié (n'ayant pas d'effectif au 31/12 mais ayant employé des salariés au cours de l'année de référence)</option>
              <option value="01">1 ou 2 salariés</option>
              <option value="02">3 à 5 salariés</option>
              <option value="03">6 à 9 salariés</option>
              <option value="11">10 à 19 salariés</option>
              <option value="12">20 à 49 salariés</option>
              <option value="21">50 à 99 salariés</option>
              <option value="22">100 à 199 salariés</option>
              <option value="31">200 à 249 salariés</option>
              <option value="32">250 à 499 salariés</option>
              <option value="41">500 à 999 salariés</option>
              <option value="42">1 000 à 1 999 salariés</option>
              <option value="51">2 000 à 4 999 salariés</option>
              <option value="52">5 000 à 9 999 salariés</option>
              <option value="53">10 000 salariés et plus</option>
              
              
            </select>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      );
    }
  }


  export default SelectTaille;