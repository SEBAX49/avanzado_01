
import CardDetail from './CardDetail';

function App() {
  return (
    <CardDetail 
      ataque={300}
      nombre="pepe"
      defensa={1}
      descripcion="la rana pepe"
      imagen="https://m.media-amazon.com/images/I/61MMFc1RBvL._AC_SX300_SY300_QL70_ML2_.jpg" 
      numero={1}
      tipo="CULEAO"
    />
  );
}
 export default App;