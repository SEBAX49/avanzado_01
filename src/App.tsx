
import CardDetail from './CardDetail';

function App() {
  const personajes = [
    {
      nombre: "Pepe",
      numero: "001",
      tipo: "CULEAO",
      ataque: 300,
      defensa: 1,
      imagen: "URL_DE_TU_IMAGEN_DE_PEPE",
      descripcion: "la rana pepe"
    },
    {
      nombre: "Electivire",
      numero: "002",
      tipo: "Eléctrico",
      ataque: 122,
      defensa: 80,
      imagen: "URL_DE_ELECTIVIRE",
      descripcion: "Electivire, el Pokémon Rayo..."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-200 p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-slate-800 uppercase tracking-widest">
        Mi Colección
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-end">
        {personajes.map((p, index) => (
          <CardDetail 
            key={index}
            nombre={p.nombre}
            numero={p.numero}
            tipo={p.tipo}
            ataque={p.ataque}
            defensa={p.defensa}
            imagen={p.imagen}
            descripcion={p.descripcion}
          />
        ))}
      </div>
    </div>
  );
}

export default App;