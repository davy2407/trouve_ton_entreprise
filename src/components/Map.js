import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker as MarkerTest, Popup as Test1} from "react-map-gl";












function Map(props) {

const test = () =>{
  console.log(props.onCoords);
}



const [viewport, setViewport] = useState({
  latitude : props.onCoords.lat,
  longitude : props.onCoords.lng,
  width : "50vw",
  height : "50vh",
  zoom : 11
  
});

useEffect(() => setViewport({
  latitude : props.onCoords.lat,
  longitude : props.onCoords.lng,
  width : "70vw",
  height : "50vh",
  zoom : 11
  
}), [props.onCoords]);



const [marqueurUtilisateur,setMarqueurUtilisateur] = useState(
 
  [  ]
 
);

useEffect(()=> setMarqueurUtilisateur(props.onEntreprises),[props.onEntreprises]);








// const handleClick = async event =>{
  
//   const newMarqueurUtilisateur = {name : "test" ,longitude : event.lngLat[0],latitude : event.lngLat[1]};
//   const updatedMarqueurUtiliasateur = [...marqueurUtilisateur];
//   updatedMarqueurUtiliasateur.push(newMarqueurUtilisateur);
//   setMarqueurUtilisateur(updatedMarqueurUtiliasateur);
//   test();

// }


const [selectedPoint, setSelectedPoint] = useState(null);
useEffect(() => {
  const listener = e => {
    if(e.key === "Escape"){
      setSelectedPoint(null);
    }
  };
  window.addEventListener("keydown",listener);
},[]);

// useEffect(() => {
  
//    setViewport({
//      latitude : props.onCoords.lat,
//      longitude : props.onCoords.lng
//    })

  
 
// }, [viewport])




  



  return (
    <div className="RouenSec">
    
         
          <div className="App"  >
      <ReactMapGL {...viewport}
      mapboxApiAccessToken = "pk.eyJ1IjoiZGF2eTI0MDciLCJhIjoiY2szb2N5NXpjMWpibTNucXhqY2hzdnczZSJ9.iCSTSNxMJ4purLDyJht0zA"
      mapStyle="mapbox://styles/davy2407/ck3odefkl05e11cmj7dxg5wj8"
      onViewportChange = {(viewport) => {
        setViewport(viewport);
      }}
      
      // onClick={(event)=> {handleClick(event)}}

      
      >
        
        
         
          
        
        {marqueurUtilisateur.map((test)=> (
          <MarkerTest name="test" latitude={parseFloat(test.latitude)} longitude={ parseFloat(test.longitude)}>
            <button className="marker-btn" onClick= {(e)=> {
              e.preventDefault();
              setSelectedPoint(test)
            }}>
              <img src="marker.svg" alt="Marker Icon"/>
            </button>
          </MarkerTest>
        ))}

        {selectedPoint ? (
          <Test1 
          latitude={parseFloat(selectedPoint.lat)} 
          longitude={parseFloat(selectedPoint.lng)}
          onClose={() => {
            setSelectedPoint(null);
          }}>
            <div>
              <h2>{selectedPoint.name}</h2>

            </div>

          </Test1>

        ) : null}




      </ReactMapGL>
      
      
    </div>

    

    </div>
  );
}

export default Map;
