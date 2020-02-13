//Creacion de cartas automaticas

function carga() {
    debugger;
    var getObject = JSON.parse(localStorage.getItem("Usuarios"));

    if (getObject == null) {
        //Creo un objeto json con un array de objetos dentro
        añadir = {
            "Usuarios": [

            ]
        };

        //Subo el objeto json al localStorage en formato string
        localStorage.setItem("Usuarios", JSON.stringify(añadir));
        return;
    }
    debugger;
    for (i = 0; i < getObject.Usuarios.length; i++) {
        let name = getObject.Usuarios[i].nombre;
        let surname = getObject.Usuarios[i].apellido;
        let life = getObject.Usuarios[i].vida;
        CrearCarta(name, surname, life);
    }
}

function modificarCartas(Nombre, Apellido, Vida, Tipo) {

    //Me descargo el string de localStorage y lo convierto a JSON
    let getObject = JSON.parse(localStorage.getItem("Usuarios"));
    let lista = getObject.Usuarios;
    let repetido = false;
    if (Tipo == "Añadir") {
        //Creo un segundo objeto para añadir
        nuevo = { "nombre": Nombre, "apellido": Apellido, "vida": Vida }

        //Añado el segundo objeto al array del JSON
        for (i = 0; i < getObject.Usuarios.length; i++) {
            if (lista[i].nombre == Nombre && lista[i].apellido == Apellido && lista[i].vida == Vida) {
                repetido = true;
                return;
            }
        }
        if (repetido == false) { getObject.Usuarios.push(nuevo) }
    }
    else {
        for (i = 0; i < lista.length; i++) {
            if (lista[i].nombre == Nombre && lista[i].apellido == Apellido && lista[i].vida == Vida) {
                lista.splice(i, 1);
            }
        }
    }

    //Vuelvo a subir el JSON modificado
    localStorage.setItem("Usuarios", JSON.stringify(getObject));

}

function comprobar() {

    // localStorage.removeItem("Usuarios");
    getObject = JSON.parse(localStorage.getItem("Usuarios"));

    console.log(getObject);
}

function limpiar() {
    localStorage.removeItem("Usuarios");
}

function CrearCarta(Nombrecito, Apelliditos, Vidita) {
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
    inputNombre.setAttribute("onkeydown", "return limitarLetras(event)")
    inputNombre.setAttribute("type", "text");
    inputNombre.style = "border: none; margin-bottom: 5px;";
    inputNombre.disabled = true;

    Nombre.appendChild(inputNombre);

    var inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("onkeydown", "return limitarLetras(event)")
    inputApellidos.setAttribute("type", "text");
    inputApellidos.style = "border: none; margin-bottom: 5px;";
    inputApellidos.disabled = true;

    var inputVida = document.createElement("input");
    inputVida.setAttribute("onkeydown", "return limitarNumeros(event)")
    inputVida.setAttribute("type", "text");
    inputVida.style = "border: none; margin-bottom: 5px;";
    inputVida.disabled = true;

    var borrar = document.createElement("button");
    borrar.innerText = "Borrar";
    borrar.setAttribute("onclick", "BorrarCarta(this)");
    borrar.setAttribute("class", "btnBorrar");

    if (Vidita != null) {

        inputVida.setAttribute("value", Vidita);
        inputApellidos.setAttribute("value", Apelliditos);
        inputNombre.setAttribute("value", Nombrecito);
        contCarta.appendChild(Nombre);
        contCarta.appendChild(inputApellidos);
        contCarta.appendChild(inputVida);
    }
    else {
        contCartaMain.className += "border border-danger";
        inputVida.setAttribute("placeholder", "Introduzca Vida");
        inputNombre.setAttribute("placeholder", "Introduzca Nombre");
        inputApellidos.setAttribute("placeholder", "Introduzca Apellidos");
        contCarta.appendChild(Nombre);
        contCarta.appendChild(inputApellidos);
        contCarta.appendChild(inputVida);
        contCarta.appendChild(borrar);
    }



    // var texto = document.createElement("p");
    // texto.className = "card-text";
    // texto.appendChild(document.createTextNode("Texto de ejemplo"));


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
}

function Formulario(n) {
    if (n == 1) {
        var contenedor = document.getElementById("ContenedorCartas");
        contenedor.parentNode.removeChild(contenedor);
        console.log(contenedor);
    }
    else {
        contenedor.parentNode.appendChild(contenedor);
    }
}

function ComprobarCampos() {
    let si = true;
    let TodosInputs = document.getElementsByTagName("input");
    for (i = 0; i < TodosInputs.length; i++) {
        if (TodosInputs[i].value == "") {
            TodosInputs[i].placeholder = "QUE INTRODUZCAS ALGO";
            si = false;
        }
    }
    return si;

}

function GuardarCartas(Tipo) {
    debugger;
    let cartas = document.getElementsByClassName("card-body");
    var nombre;
    var apellido;
    var vida;
    if (Tipo == "Guardar") {
        for (i = 0; i < cartas.length; i++) {
            inputs = cartas[i].childNodes;
            test = inputs[0].childNodes;
            nom = test[0].value;
            ape = inputs[1].value;
            vida = inputs[2].value;
            modificarCartas(nom, ape, vida, "Añadir");
        }
    }
    else {
        inputs = Tipo.childNodes;
        test = inputs[0].childNodes;
        nom = test[0].value;
        ape = inputs[1].value;
        vida = inputs[2].value;
        modificarCartas(nom, ape, vida, "Borrar");
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