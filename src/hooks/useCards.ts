import { useState, useCallback } from 'react';
import { Card } from '../types/card';

const initialPersonajes: Card[] = [
  {
    nombre: "Pepe",
    numero: "001",
    tipo: "CULEAO",
    ataque: 300,
    defensa: 1,
    imagen: "URL_DE_TU_IMAGEN_DE_PEPE",
    descripcion: "La rana más poderosa del reino digital. Su mirada puede juzgar tu alma desde el otro lado de la pantalla."
  },
  {
    nombre: "Electivire",
    numero: "002",
    tipo: "Eléctrico",
    ataque: 122,
    defensa: 80,
    imagen: "URL_DE_ELECTIVIRE",
    descripcion: "Electivire, el Pokémon Rayo. Sus dos colas pueden liberar una descarga de 20.000 voltios en un instante."
  },
  {
    nombre: "Charizard",
    numero: "006",
    tipo: "Fuego",
    ataque: 184,
    defensa: 78,
    imagen: "",
    descripcion: "Sus llamas son lo suficientemente calientes como para fundir roca sólida. Es el epítome del poder ígneo."
  },
];

export function useCards() {
  const [cards, setCards] = useState<Card[]>(initialPersonajes);

  const addCard = useCallback((newCard: Card) => {
    setCards(prev => [...prev, newCard]);
  }, []);

  // Future API integration:
  // useEffect(() => {
  //   fetch('api/cards').then(res => res.json()).then(setCards)
  // }, [])

  return {
    cards,
    addCard
  };
}
