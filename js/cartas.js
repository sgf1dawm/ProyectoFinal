//Creacion de cartas automaticas

function CrearCarta() {

    var contMain = document.getElementById("ContenedorCartas");

    var contCartaMain = document.createElement("div");
    contCartaMain.className = "card mx-3 mt-3";
    contCartaMain.style = "width: 18rem;";
    contCartaMain.setAttribute("onmouseover", "Desbloquear(this)");
    contCartaMain.setAttribute("onmouseout", "Bloquear(this)");

    var imagen = document.createElement("img");
    imagen.className = "card-img-top";
    imagen.setAttribute("src", "./img/Black.webp");

    var contCarta = document.createElement("div");
    contCarta.className = "card-body";

    var Nombre = document.createElement("h5");

    var inputNombre = document.createElement("input");
    inputNombre.setAttribute("type", "text");
    inputNombre.style = "border: none; margin-bottom: 5px;";
    inputNombre.setAttribute("value", "Introduzca Nombre");
    inputNombre.disabled = true;

    Nombre.appendChild(inputNombre);

    var inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("type", "text");
    inputApellidos.style = "border: none; margin-bottom: 5px;";
    inputApellidos.setAttribute("value", "Introduzca Apellidos");
    inputApellidos.disabled = true;

    var inputVida = document.createElement("input");
    inputVida.setAttribute("type", "text");
    inputVida.style = "border: none; margin-bottom: 5px;";
    inputVida.setAttribute("value", "Introduzca Vida");
    inputVida.disabled = true;




    // var texto = document.createElement("p");
    // texto.className = "card-text";
    // texto.appendChild(document.createTextNode("Texto de ejemplo"));

    contCarta.appendChild(Nombre);
    contCarta.appendChild(inputApellidos);
    contCarta.appendChild(inputVida);
    contCartaMain.appendChild(imagen);
    contCartaMain.appendChild(contCarta);
    contMain.appendChild(contCartaMain);
}

var Editar = false;

function ModoEditar(boton) {
    if (Editar == false) {
        Editar = true;
        boton.innerText = "Terminar de editar";
    }
    else {
        Editar = false
        boton.innerText = "Empieza a editar";
    }
}

function Desbloquear(carta) {
    debugger;
    if (Editar == true) {
        var inputs = carta.getElementsByTagName("input");
        var borrar = document.createElement("button");
        borrar.innerText = "Borrar";
        borrar.setAttribute("onclick", "BorrarCarta(this)");
        let hijos = carta.childNodes;
        hijos[3].appendChild(borrar);
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    }
}


function Bloquear(carta) {



    if (Editar == true) {

        var inputs = carta.getElementsByTagName("input");
        var boton = carta.getElementsByTagName("button");
        let hijos = carta.childNodes;
        hijos[3].removeChild(boton[0]);
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        return;
    }
    if (carta == "body") {
        var inputs = ContenedorCartas.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    }



}

function BorrarCarta(boton) {
    var carta = boton.parentNode;
    carta.parentNode.removeChild(carta);
}