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

  const [listeEntreprises, setListeEntreprises]= useState(
    []
  )

  const [latLng, setLatLng] = useState(
    {
      lat : 48.845,
      lng : 2.3752
    }
  );

  const [rayonState, setRayonState] = useState(0);

  const [nafState, setNafState]= useState("");



  // currentSearch = {
  //   id : "",
  //   nom : ""
  // }
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

  const rayonRecherche = (rayon) => {
    const rayonUser = rayon;
    setRayonState(rayonUser);
    console.log(rayon);

  }

  const codeNaf = (naf) => {
    const nafUser = naf;
    setNafState(nafUser);
    console.log(nafUser);
  }

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

  // Fonction gère le call API permettant la recherche d'entreprises autour d'une ville demandé par l'utilisateur avec pour 
  // critères permettant d'affiner la recherche : le code NAF (secteur d'activité ) et le rayon (km) de recherche.


  const rechercheRayonNaf = () => {

    const lat = latLng.lat;
    const long = latLng.lng;
    const rayon = rayonState;
    const naf = nafState;

     fetch('https://entreprise.data.gouv.fr/api/sirene/v1/near_point/?lat='+lat+'&long='+long+'&activite_principale='+naf+'&radius='+rayon+'&per_page=100&page=1')
      .then(res => res.json())
      .then(
        (result) => {
          setApiTest({
            isLoaded: true,
            items: result.items
          });
          
          
          
          
          // for (let i = 0; i <= testEta.length; i++) {
             
          //     let lat = parseFloat(result.etablissements[i].latitude);
          //     let lng = parseFloat(result.etablissements[i].longitude);
          //     testEta[i].latitude = lat;
          //     testEta[i].longitude = lng;
            
            
          // }
          
           
            
          
          
         
          setListeEntreprises(result.etablissements)
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
    
    console.log(recherche);
    
  
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
          <Form onRechercheAdd={handleAdd}
          
          
          
          ></Form>
          {/* <div>{recherches.map(objet => {
            return (
              <h3>{objet.nom}</h3>
            )
          })}</div> */}

          <div>
        <h3>{currentSearch.nom}</h3>
          </div>

          <SelectMenu onNaf = {codeNaf}>

          </SelectMenu>

        </div>
        <div>
          <button onClick={apiCallTest}>Afficher sur MAP</button>
          
        </div>

        <SelectRayon onRayon={rayonRecherche}>

        </SelectRayon>


        <SelectTaille>

        </SelectTaille>

        <button onClick={rechercheRayonNaf}>Bouton final</button>

        <Map onCoords = {latLng}
        onEntreprises = {listeEntreprises}
        // onEntreprisesLat = {listeEntreprises.latitude}
        // onEntreprisesLng = {listeEntreprises.longitude}
        >

        </Map>

        <div>
          {listeEntreprises.map(objet =>{
            return (
            <h4>{objet.nom_raison_sociale},{objet.latitude},{objet.longitude}</h4>
            
            )
          })}
        </div>
    </div>
  );
}

export default App;
