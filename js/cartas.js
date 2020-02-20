//Creacion de cartas automaticas

function carga() {
    debugger;
    var getObject = JSON.parse(localStorage.getItem("Personajes"));

    if (getObject == null) {
        //Creo un objeto json con un array de objetos dentro
        añadir = {
            "Personajes": [

            ]
        };

        //Subo el objeto json al localStorage en formato string
        localStorage.setItem("Personajes", JSON.stringify(añadir));
        return;
    }
    for (i = 0; i < getObject.Personajes.length; i++) {
        let name = getObject.Personajes[i].nombre;
        let surname = getObject.Personajes[i].apellido;
        let life = getObject.Personajes[i].vida;
        let attack = getObject.Personajes[i].ataque;
        CrearCarta(name, surname, life, attack);
    }
    debugger;
    if (getObject.Personajes.length < 1) {
        btnPelea.disabled = true;
    }
}

function modificarCartas(Nombre, Apellido, Vida, Ataque, Tipo) {

    //Me descargo el string de localStorage y lo convierto a JSON
    let getObject = JSON.parse(localStorage.getItem("Personajes"));
    let lista = getObject.Personajes;
    let repetido = false;
    if (Tipo == "Añadir") {
        //Creo un segundo objeto para añadir
        nuevo = { "nombre": Nombre, "apellido": Apellido, "vida": Vida, "ataque": Ataque }

        //Añado el segundo objeto al array del JSON
        for (i = 0; i < getObject.Personajes.length; i++) {
            if (lista[i].nombre == Nombre && lista[i].apellido == Apellido && lista[i].vida == Vida && lista[i].ataque == Ataque) {
                repetido = true;
                return;
            }
        }
        if (repetido == false) { getObject.Personajes.push(nuevo) }
    }
    else {
        for (i = 0; i < lista.length; i++) {
            if (lista[i].nombre == Nombre && lista[i].apellido == Apellido && lista[i].vida == Vida && lista[i].ataque == Ataque) {
                lista.splice(i, 1);
            }
        }
    }

    //Vuelvo a subir el JSON modificado
    localStorage.setItem("Personajes", JSON.stringify(getObject));
    if (getObject.Personajes.length < 1) {
        btnPelea.disabled = true;
    }

}

function comprobar() {

    // localStorage.removeItem("Personajes");
    getObject = JSON.parse(localStorage.getItem("Personajes"));

    console.log(getObject);
}

function limpiar() {
    localStorage.removeItem("Personajes");
}

function CrearCarta(Nombrecito, Apelliditos, Vidita, Ataquecito) {
    debugger;
    var contMain = document.getElementById("ContenedorCartas");

    var contCartaMain = document.createElement("div");
    contCartaMain.className = "card mx-3 mt-3"
    contCartaMain.style = "width: 18rem;";
    contCartaMain.setAttribute("onmouseover", "Desbloquear(this)");
    contCartaMain.setAttribute("onmouseout", "Bloquear(this)");

    var imagen = document.createElement("img");
    imagen.className = "card-img-top";
    imagen.setAttribute("src", ImagenSiguiente());
    imagen.setAttribute("width", "70");
    imagen.setAttribute("height", "300");

    var contCarta = document.createElement("div");
    contCarta.className = "card-body";

    var Nombre = document.createElement("h5");
    var inputNombre = document.createElement("input");
    inputNombre.setAttribute("onkeydown", "return limitarLetras(event)");
    inputNombre.setAttribute("type", "text");
    inputNombre.className = "letras";
    inputNombre.style = "border: none; margin-bottom: 5px;";
    inputNombre.disabled = true;
    Nombre.appendChild(inputNombre);

    var inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("onkeydown", "return limitarLetras(event)")
    inputApellidos.setAttribute("type", "text");
    inputApellidos.className = "letras";
    inputApellidos.style = "border: none; margin-bottom: 5px;";
    inputApellidos.disabled = true;

    var inputVida = document.createElement("input");
    inputVida.setAttribute("onkeydown", "return limitarNumeros(event)")
    inputVida.setAttribute("type", "text");
    inputVida.className = "numeros";
    inputVida.style = "border: none; margin-bottom: 5px;";
    inputVida.disabled = true;

    var inputAtaque = document.createElement("input");
    inputAtaque.setAttribute("onkeydown", "return limitarNumeros(event)")
    inputAtaque.setAttribute("type", "text");
    inputAtaque.className = "numeros";
    inputAtaque.style = "border: none; margin-bottom: 5px;";
    inputAtaque.disabled = true;

    var borrar = document.createElement("button");
    borrar.innerText = "Borrar";
    borrar.setAttribute("onclick", "BorrarCarta(this)");
    borrar.setAttribute("class", "btnBorrar");

    if (Vidita != null) {

        inputAtaque.setAttribute("value", Ataquecito);
        inputVida.setAttribute("value", Vidita);
        inputApellidos.setAttribute("value", Apelliditos);
        inputNombre.setAttribute("value", Nombrecito);
        contCarta.appendChild(Nombre);
        contCarta.appendChild(inputApellidos);
        contCarta.appendChild(inputVida);
        contCarta.appendChild(inputAtaque);
    }
    else {
        contCartaMain.className += "border border-danger";
        inputAtaque.setAttribute("placeholder", "Introduce Ataque");
        inputVida.setAttribute("placeholder", "Introduzca Vida");
        inputNombre.setAttribute("placeholder", "Introduzca Nombre");
        inputApellidos.setAttribute("placeholder", "Introduzca Apellidos");
        contCarta.appendChild(Nombre);
        contCarta.appendChild(inputApellidos);
        contCarta.appendChild(inputVida);
        contCarta.appendChild(inputAtaque);
        contCarta.appendChild(borrar);
    }

    contCartaMain.appendChild(imagen);
    contCartaMain.appendChild(contCarta);
    contMain.appendChild(contCartaMain);
}

var Editar = false;

var nImg = -1;
function ImagenSiguiente() {

    var src;
    nImg++;
    switch (nImg) {
        case 0:
            src = "./img/bob.jpg";
            break;

        case 1:
            src = "./img/calamardo.jpg";
            break;

        case 2:
            src = "./img/patrick.jpg";
            break;

        case 3:
            src = "./img/gary.jpg";
            break;

        case 4:
            src = "./img/justice.jpg";
            break;

        case 5:
            src = "./img/bob_tonto.jpg";
            break;

        case 6:
            src = "./img/Calamardo_Guapo.jpg";
            break;

        case 7:
            src = "./img/Arenita.jpg"
            nImg = -1;
            break;

    }

    return src;

}

function ModoEditar(boton) {

    if (Editar == false) {
        // btnPelea
        let crear = document.createElement("button");
        crear.innerText = "Crear un carta";
        crear.setAttribute("onclick", "CrearCarta()");
        crear.setAttribute("id", "btncrear");
        boton.parentNode.appendChild(crear);
        Resaltar("si");
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
        if (ComprobarCampos()) {
            GuardarCartas("Guardar");
            Resaltar("no");
            Editar = false
            let botonCrear = document.getElementById("btncrear");
            botonCrear.parentNode.removeChild(botonCrear);
            boton.innerText = "Empieza a editar";
            let botoncitos = document.getElementsByClassName("btnBorrar");
            for (i = botoncitos.length - 1; i >= 0; i--) {
                botoncitos[i].parentNode.removeChild(botoncitos[i]);
            }
        }

    }

    // document.getElementById("ContenedorCartas").childNodes < 2 ? btnPelea.disabled = true : btnPelea.disabled = false;
}


// function Formulario(n) {
//     if (n == 1) {
//         debugger;
//         var contenedor = document.getElementById("ContenedorCartas").childNodes;
//         for (i = contenedor.length - 1; i >= 0; i--) {
//             let prueba = contenedor[i];
//             prueba.parentNode.removeChild(prueba);
//         }
//         return;
//     }
//     if (n == 0) {
//         Formulario(1);
//         form = document.createElement("form");
//         form.appendChild(inputNombre);
//         form.appendChild(inputApellidos);
//         form.appendChild(inputVida);
//         form.appendChild(inputAtaque);
//         document.getElementById("ContenedorCartas").appendChild(form);

//     }
//     else {
//         carga();
//     }
// }

function ComprobarCampos() {
    debugger;
    let si = true;
    let TodosInputs = document.getElementsByTagName("input");
    var regexpN = /\d\S{ 1, 3}/g;
    for (i = 0; i < TodosInputs.length; i++) {
        TodosInputs[i].style = "border: none";
        if (TodosInputs[i].value == "") {
            TodosInputs[i].style = "border: 1px solid red";
            si = false;
        }
        else if (TodosInputs[i].className == "numeros" && TodosInputs[i].value == regexpN) {
            TodosInputs[i].style = "border: 1px solid red";
            si = false;
        }

    }
    return si;

}

function GuardarCartas(Tipo) {
    debugger;
    let cartas = document.getElementsByClassName("card-body");
    var nom;
    var ape;
    var vida;
    var ataque;
    if (Tipo == "Guardar") {
        for (i = 0; i < cartas.length; i++) {
            inputs = cartas[i].childNodes;
            test = inputs[0].childNodes;
            nom = test[0].value;
            ape = inputs[1].value;
            vida = inputs[2].value;
            ataque = inputs[3].value;
            modificarCartas(nom, ape, vida, ataque, "Añadir");
        }
    }
    else {
        inputs = Tipo.childNodes;
        test = inputs[0].childNodes;
        nom = test[0].value;
        ape = inputs[1].value;
        vida = inputs[2].value;
        ataque = inputs[3].value;
        modificarCartas(nom, ape, vida, ataque, "Borrar");
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
    let contendor = carta.parentNode;
    contendor.removeChild(carta);
    GuardarCartas(padre);

}

function limitarLetras() {
    let e = window.event || evento;
    let tecla = e.keyCode;
    if ((tecla >= 65 && tecla <= 90) || tecla == 8 || tecla == 32 || tecla == 37 || tecla == 39 || tecla == 46) {
        return true;
    }
    else {
        return false;
    }
}

function limitarNumeros() {
    let e = window.event || evento;
    let tecla = e.keyCode;
    if ((tecla >= 48 && tecla <= 57) || tecla == 8 || tecla == 37 || tecla == 39 || tecla == 46) {
        return true;
    }
    else {
        return false;
    }
}

function Pelea(n) {
    if (n != 0) {
        debugger;
        getObject = JSON.parse(localStorage.getItem("Personajes"));
        var listaIndices = new Array();
        var mayor = 0;

        for (i = 0; i < getObject.Personajes.length; i++) {
            let life = getObject.Personajes[i].vida;
            let attack = getObject.Personajes[i].ataque;
            let indice = life * (attack / 100);
            listaIndices[i] = indice;
            mayor = indice > mayor ? indice : mayor;
        }
        mayor = listaIndices.indexOf(mayor) + 1;
        contendor = document.getElementById("ContenedorCartas").childNodes;
        for (y = 1; y < contendor.length; y++) {
            if (y != mayor)
                contendor[y].className = "ocultar";
        }
        titulo = document.createElement("h2");
        titulo.innerText = "Ganador";
        titulo.style = "text-align: center;";
        contendor[mayor].appendChild(titulo);
        contendor[mayor].className = "ganador";
        btnEditar.className = "ocultar";
        btnPelea.className = "ocultar";
        let volver = document.createElement("button");
        volver.innerText = "Volver a la lista";
        volver.setAttribute("onclick", "location.reload()");
        volver.style = "float: right; border: 1px solid black";
        contendor[mayor].appendChild(volver);
    }

}

function Color(evento) {
    debugger;

    if (evento == null) {
        // if (btnCustom.value == "Customizar color")
        let vody = document.getElementsByTagName("body");
        vody[0].setAttribute("onkeydown", "return Color(event)");
        document.getElementById("btnCustom").innerText = "Deja de customizar";
        let guia = document.getElementById("guiaColores");
        guia.innerText = "W = White | Y = Yellow | R = Red | B = Blue";
    }
    else {
        var teclaPulsada = evento.keyCode;
        let jeder = document.getElementById("cabecera");
        if (teclaPulsada == 66) {
            jeder.style = "background-color:rgba(0, 0, 255, 0.35); border: 2px solid black;";
        }
        if (teclaPulsada == 89) {
            jeder.style = "background-color:rgba(255, 255, 0, 0.35); border: 2px solid black;";
        }
        if (teclaPulsada == 82) {
            jeder.style = "background-color:rgba(255, 0, 0, 0.35); border: 2px solid black;";
        }
        if (teclaPulsada == 87) {
            jeder.style = "background-color:rgba(255, 255, 255, 0.35); border: 2px solid black;";
        }
    }
}
