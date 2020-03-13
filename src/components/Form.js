import React , {useState} from 'react';

const RechercheForm = (props) => {
    const [nouvelleRecherche, setNouvelleRecherche] = useState("")

    const handleChange = event => {
        setNouvelleRecherche(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const id = new Date().getTime();
        const nom = nouvelleRecherche;

        props.onRechercheAdd({id,nom});
        
        setNouvelleRecherche("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={nouvelleRecherche}
                onChange={handleChange}
                type="text"
                placeholder="Rechercher un lieux"
            />
            <button onClick={(props.onTestApi)}>Confirmer</button>
        </form>
    );
}

export default RechercheForm;