import React, { useState, useEffect} from 'react'

function FunctionCount() {

    const [count, setCount] = useState(0);
    

    useEffect(()=>{
        document.title = `Vous avez cliqué ${count} fois `;
    })
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count + 1)}>Cliquer</button>
        </div>
    )
}

export default FunctionCount
