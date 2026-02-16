import React from 'react';

// function Hola() {
//     return <h1>Hello world!</h1>
// }

const Hola = props => {
    console.log(props);
    return <h1>Hello {props.name} aka {props.superhero}</h1>;
}
//const Hola = () => <h1>Stateless Component</h1>;

export default Hola;