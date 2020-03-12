import React,{useState, useEffect} from 'react';


import './App.css';
import Form from './components/Form';
import SelectMenu from './components/SelectMenu';
import SelectRayon from './components/SelectRayon';
import SelectTaille from './components/SelectTaille';
import Map from './components/Map';
import ClassCount from './components/ClassCount';
import FunctionCount from './components/FunctionCount';



function App() {

  const [recherches, setRecherches] = useState(
    [
      
    ]
  );

  const [latLng, setLatLng] = useState(
    {
      lat : 48.845,
      lng : 2.3752
    }
  )

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
          console.log(result.features[0].geometry.coordinates);
          setLatLng({
            lat : result.features[0].geometry.coordinates[1],
            lng : result.features[0].geometry.coordinates[0]
          });
          console.log(latLng);
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
       {/* <ClassCount/> */}
      <FunctionCount/>
      <h1>
            Annuaire d'entreprises
            Ceci est une première version. 
            Plusieurs options sont actuellement en travaux. 
            La création automatique de marqueurs sur la Map n'est pas encore valide ainsi que le filtre
            de recherche par date ( voir console)
        </h1>
       

        <div className="RechercheVille">
          <Form onRechercheAdd={handleAdd}></Form>
          <div>{recherches.map(objet => {
            return (
              <h3>{objet.nom}</h3>
            )
          })}</div>

          <SelectMenu>

          </SelectMenu>

        </div>
        <div>
          <button onClick={apiCallTest}>Test Console</button>
          
        </div>

        <SelectRayon>

        </SelectRayon>


        <SelectTaille>

        </SelectTaille>

        <Map onCoords = {latLng}>

        </Map>
    </div>
  );
}

export default App;
