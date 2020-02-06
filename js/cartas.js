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
    inputNombre.setAttribute("placeholder", "Introduzca Nombre");
    inputNombre.disabled = true;

    Nombre.appendChild(inputNombre);

    var inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("type", "text");
    inputApellidos.style = "border: none; margin-bottom: 5px;";
    inputApellidos.setAttribute("placeholder", "Introduzca Apellidos");
    inputApellidos.disabled = true;

    var inputVida = document.createElement("input");
    inputVida.setAttribute("type", "text");
    inputVida.style = "border: none; margin-bottom: 5px;";
    inputVida.setAttribute("placeholder", "Introduzca Vida");
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
        debugger;
        Resaltar("si");
        ResaltarPlus();
        Editar = true;
        boton.innerText = "Terminar de editar";
        var borrar = document.createElement("button");
        let cartitas = document.getElementsByClassName("card-body");
        borrar.innerText = "Borrar";
        borrar.setAttribute("onclick", "BorrarCarta(this)");
        borrar.setAttribute("class", "btnBorrar");

        for (i = 0; i < cartitas.length; i++) {
            cartitas[i].appendChild(borrar.cloneNode(true));
        }
    }
    else {
        debugger;
        Resaltar("no");
        Editar = false
        boton.innerText = "Empieza a editar";
        let botoncitos = document.getElementsByClassName("btnBorrar");
        for (i = botoncitos.length - 1; i >= 0; i--) {
            botoncitos[i].parentNode.removeChild(botoncitos[i]);
        }

    }
}

function Resaltar(SioNo) {
    debugger;
    let cartitas = document.getElementsByClassName("card-body");
    for (i = 0; i < cartitas.length; i++) {
        carta = cartitas[i].parentNode;
        if (SioNo == "si") {
            carta.className += " border border-danger";
        }
        else {
            let nuevaClase = "";
            let clases = carta.className.split(" ");
            for (y = 0; y < clases.length; y++) {
                if (clases[y] != "border" && clases[y] != "border-danger") {
                    nuevaClase += clases[y] + " ";
                }
            }
            carta.className = nuevaClase;
            // cartitas[i].parentNode.classList.remove("border border-danger");
        }
    }
}

//Intentar hacer funcionar esto
function ResaltarPlus() {
    let cartitas = document.getElementsByClassName("card-body");
    let estilo = "transition: color 0.25s; &:: before, &:: after { // Set border to invisible, so we don't see a 4px border on a 0x0 element before the transition starts border: 2px solid transparent; width: 0; height: 0; } // This covers the top & right borders (expands right, then down) &:: before { top: 0; left: 0; } // And this the bottom & left borders (expands left, then up) &:: after { bottom: 0; right: 0; } &: hover { color: $cyan; } // Hover styles &: hover:: before, &: hover:: after { width: 100 %; height: 100 %; } &: hover:: before { border - top - color: $cyan; // Make borders visible border - right - color: $cyan; transition: width 0.25s ease - out, // Width expands first height 0.25s ease - out 0.25s; // And then height } &: hover:: after { border - bottom - color: $cyan; // Make borders visible border - left - color: $cyan; transition: border - color 0s ease - out 0.5s, // Wait for ::before to finish before showing border width 0.25s ease - out 0.5s, // And then exanding width height 0.25s ease - out 0.75s; // And finally height }"

}

function Desbloquear(carta) {
    if (Editar == true) {
        var inputs = carta.getElementsByTagName("input");

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    }
}


function Bloquear(carta) {



    if (Editar == true) {

        var inputs = carta.getElementsByTagName("input");

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
    debugger;
    var padre = boton.parentNode;
    let carta = padre.parentNode;
    carta.parentNode.removeChild(carta);
}