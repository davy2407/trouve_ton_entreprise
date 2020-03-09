import React,{useState, useEffect} from 'react';

import './App.css';
import Form from './components/Form';
import SelectMenu from './components/SelectMenu';

function App() {

  const [recherches, setRecherches] = useState(
    [
      {id: 1, nom : "Test Recherche"}
    ]
  );

  const [currentSearch, setCurrentSearch] = useState(
    {}
  )

  const [apiTest , setApiTest]= useState(
    {
      error: null,
      isLoaded: false,
      items: []
    }
  );

  const apiCallTest = () => {
    fetch("https://api-adresse.data.gouv.fr/search/?q="+currentSearch.nom)
      .then(res => res.json())
      .then(
        (result) => {
          setApiTest({
            isLoaded: true,
            items: result.items
          });
          console.log(result);
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          setApiTest({
            isLoaded: true,
            error
          });
        }
      )
  }


  const handleAdd = recherche => {
    const updatedRecherches = [...recherches];
    updatedRecherches.push(recherche);
    ;
    setRecherches(updatedRecherches);
    setCurrentSearch(recherche);
    console.log(updatedRecherches);
    
  
  };
  return (
    <div className="App">
      <h1>
            Annuaire d'entreprises
            Ceci est une première version. 
            Plusieurs options sont actuellement en travaux. 
            La création automatique de marqueurs sur la Map n'est pas encore valide ainsi que le filtre
            de recherche par date ( voir console)
        </h1>

        <div className="RechercheVille">
          <Form onRechercheAdd={handleAdd}></Form>

          <SelectMenu>

          </SelectMenu>

        </div>
        <div>
          <button onClick={apiCallTest}></button>
          {apiTest.items}
        </div>
    </div>
  );
}

export default App;
