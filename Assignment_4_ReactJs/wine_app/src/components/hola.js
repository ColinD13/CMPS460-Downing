import React from 'react';

// function Hola() {
//     return <h1>Hello world!</h1>
// }

//props is what gets sent to the const when we call Hola in App.js, props.Name lets us retrieve the Name that we sent to the Hola const
const Hola = props => {
    console.log(props);
    return <h1>Hello {props.name} aka {props.superhero}</h1>;
}
//const Hola = () => <h1>Stateless Component</h1>;

export default Hola;