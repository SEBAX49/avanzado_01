import { useState } from "react";
import React from "react";

type Props = {
  numero: string;
  nombre: string;
  tipo: string;
  ataque: number;
  defensa: number;
  descripcion: string;
  imagen: string;
};

function CardDetail({
  ataque,
  defensa,
  descripcion,
  imagen,
  nombre,
  numero,
  tipo,
}: Props) {
  return (
    <div>
      <h3>
        {nombre}(#{numero})
      </h3>
      <img src={imagen} alt={nombre} />
      <p>tipo: {tipo}</p>
      <p>ataque: {ataque}</p>
      <p>defensa: {defensa}</p>
      <p>{descripcion}</p>
    </div>
  );
}

export default CardDetail