import { useState } from "react";

type props = {
    mazo: CartaType[];
    loading: boolean;
};

function seleccionarCartas({ mazo, loading }: props) {

    const [cartaSeleccionada1, setCartaSeleccionada1 ] =
    useState<CartaType | null>(null);
    const [cartaSeleccionada2, setCartaSeleccionada2 ] =
    useState<CartaType | null>(null);
    const [listoBatalla, setListoBatalla] = useState<boolean>(false);
}       
const hadleSeleccionarCartas = (carta: CartaType) => {
    const isSelected1 = cartaSeleccionada1 ?. idCard === carta.idCard;
    const isSelected2 = cartaSeleccionada2 ?. idCard === carta.idCard;

    if(isSelected1) {
        setCartaseleccionada(null);
        setListoBatalla(false);
        return;
    }

    if(isSelected2) {
        setCartaSeleccionada2(null);
        setListoBatalla(false);
        return;
    }

    if (!CartaSeleccionada1) {
        setCartaSeleccionada1(carta);
        if (cartaSeleccionada2) setsetListoBatalla(true);
    } else if (setCartaSeleccionada2) {
        setCartaSeleccionada2(carta);
        setListoBatalla(true);
    }

};