import { useState } from "react";
/*const cartaEjemplo = { numero: '1', elemento: 'fuego'};
function Carta({carta}) {
    return <h1>Hola soy Carta {carta.numero}{carta.fuego} !</h1>;
} 
export default function app() {
    return (
        <div>
            <Carta carta={cartaEjemplo}/>
        </div>
    );
}*/



/*const [clickText, setClickText] = useState(
    'you have not clicked this  annoying ad :(',
);
const handleClickOfThisButton = () =>
    setClickText('you clicked the annoying ad!');
return (
    <div>
       <p> {clickText} </p>
        <button onClick={() => handleClickOfThisButton}>click here!</button>
    </div>
);*/
// 1. Asegúrate de importar useState al principio del archivo:
// import { useState } from 'react';

function Carta() {
  // 1. El estado debe estar dentro de la función
  const [clickText, setClickText] = useState(
    'you have not clicked this annoying ad :(',
  );

  // 2. La lógica de la función también va dentro
  const handleClickOfThisButton = () => {
    setClickText('you clicked the annoying ad!');
  };

  // 3. El return es lo que el componente muestra
  return (
    <div>
      {clickText}
      <button onClick={handleClickOfThisButton}>click here!</button>
    </div>
  );
}

export default Carta;