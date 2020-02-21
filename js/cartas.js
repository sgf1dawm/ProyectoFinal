//Creacion de cartas automaticas

function carga() {

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
    else {
        // Creo las cartas
        for (i = 0; i < getObject.Personajes.length; i++) {
            let name = getObject.Personajes[i].nombre;
            let surname = getObject.Personajes[i].apellido;
            let life = getObject.Personajes[i].vida;
            let attack = getObject.Personajes[i].ataque;
            let image = getObject.Personajes[i].imagen;
            CrearCarta(name, surname, life, attack, image);
        }
    }

    // Compruebo si existen cookies, en caso de que existan, las cargo en el html
    if (document.cookie == "") {
        document.getElementById("antGanador").innerText = "No hay anterior gandor";
    }
    else {
        let separar = document.cookie.split(';');
        let imagen = document.getElementById("imagenGanador");
        imagen.src = separar[0];
        let ganadorAnterior = "\n" + separar[1] + "\n" + separar[2] + "\n" + separar[3] + "\n" + separar[4] + "\n";
        document.getElementById("antGanador").innerText += ganadorAnterior;
    }

    //Si hay menos de 2 luchadores, no se permite pelear
    if (getObject.Personajes.length < 2) {
        btnPelea.disabled = true;
    }
    else {
        btnPelea.disabled = false;
    }

}


//Modifico las cartas, ya sea para guardarlas o para borrarlas.
function modificarCartas(Nombre, Apellido, Vida, Ataque, Imagen, pos, Tipo) {

    //Me descargo el string de localStorage y lo convierto a JSON
    let getObject = JSON.parse(localStorage.getItem("Personajes"));
    let lista = getObject.Personajes;
    let repetido = false;
    if (Tipo == "Añadir") {
        //Creo un segundo objeto para añadir
        nuevo = { "nombre": Nombre, "apellido": Apellido, "vida": Vida, "ataque": Ataque, "imagen": Imagen }

        // En caso de haberse modificado los datos de algun personaje, cambio los datos de los mismos 
        if (pos < getObject.Personajes.length) {
            pj = getObject.Personajes[pos];
            pj.nombre = Nombre;
            pj.apellido = Apellido;
            pj.vida = Vida;
            pj.ataque = Ataque;
            pj.imagen = Imagen;
        }
        else {
            // Si se ha añadido alguno nuevo, entonces lo agrego al array de personajes
            getObject.Personajes.push(nuevo)
            // }
        }
    }
    //Si no estoy añadiendo, procedo a borrar dicho personaje del array
    else {
        for (i = 0; i < lista.length; i++) {
            if (lista[i].nombre == Nombre && lista[i].apellido == Apellido && lista[i].vida == Vida && lista[i].ataque == Ataque) {
                lista.splice(i, 1);
            }
        }
    }

    //Vuelvo a subir el JSON modificado
    localStorage.setItem("Personajes", JSON.stringify(getObject));

    //No se puede pelear si hay menos de  2 personajes
    if (getObject.Personajes.length < 2) {
        btnPelea.disabled = true;
    }
    else {
        btnPelea.disabled = false;
    }

}

function limpiar() {
    localStorage.removeItem("Personajes");
}


//////////CREACIÓN DE ELEMENTOS DEL DOM Y ASIGNACION DE EVENTOS DE TECLADO/////////////////////

function CrearCarta(Nombrecito, Apelliditos, Vidita, Ataquecito, Imagencita) {

    var contMain = document.getElementById("ContenedorCartas");

    var contCartaMain = document.createElement("div");
    contCartaMain.className = "card mx-3 mt-3"
    contCartaMain.style = "width: 18rem;";
    contCartaMain.setAttribute("onmouseover", "Desbloquear(this)");
    contCartaMain.setAttribute("onmouseout", "Bloquear(this)");

    var imagen = document.createElement("img");
    imagen.className = "card-img-top";
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
    inputVida.setAttribute("onkeypress", "return limitarNumeros(event)")
    inputVida.setAttribute("type", "text");
    inputVida.className = "vida";
    inputVida.style = "border: none; margin-bottom: 5px;";
    inputVida.disabled = true;

    var inputAtaque = document.createElement("input");
    inputAtaque.setAttribute("onkeypress", "return limitarNumeros(event)")
    inputAtaque.setAttribute("type", "text");
    inputAtaque.className = "ataque";
    inputAtaque.style = "border: none; margin-bottom: 5px;";
    inputAtaque.disabled = true;

    var borrar = document.createElement("button");
    borrar.innerText = "Borrar";
    borrar.setAttribute("onclick", "BorrarCarta(this)");
    borrar.setAttribute("class", "btnBorrar");

    //Si detecta que le estan pasando valores (en el caso de la carga de la página) crea el objeto con dichos valores
    if (Vidita != null) {
        imagen.setAttribute("src", Imagencita);
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
        imagen.setAttribute("src", ImagenSiguiente());
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


//////////FIN CREACIÓN DE ELEMENTOS DEL DOM Y ASIGNACIÓN DE EVENTOS DE TECLADO/////////////////////


var Editar = false;

//Asignación automática de imagenes
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
        Editar = true;
        Resaltar("si");
        let crear = document.createElement("button");
        let cartitas = document.getElementsByClassName("card-body");
        let instrucciones = document.createElement("p");
        let borrar = document.createElement("button");
        btnPelea.disabled = true;

        boton.innerText = "Terminar de editar";

        crear.innerText = "Crear una carta";
        crear.setAttribute("onclick", "CrearCarta()");
        crear.setAttribute("id", "btncrear");
        boton.parentNode.appendChild(crear);

        borrar.innerText = "Borrar";
        borrar.setAttribute("onclick", "BorrarCarta(this)");
        borrar.setAttribute("class", "btnBorrar");

        instrucciones.setAttribute("id", "btnInstr");
        boton.parentNode.appendChild(instrucciones);

        //Creo el boton borrar en todas las cartas
        for (i = 0; i < cartitas.length; i++) {
            cartitas[i].appendChild(borrar.cloneNode(true));
        }
    }
    else {

        if (ComprobarCampos()) {
            Editar = false;
            GuardarCartas("Guardar");
            Resaltar("no");
            let botonCrear = document.getElementById("btncrear");
            let botonInstrucciones = document.getElementById("btnInstr");
            let botoncitos = document.getElementsByClassName("btnBorrar");

            boton.innerText = "Empieza a editar";

            botonCrear.parentNode.removeChild(botonCrear);
            botonInstrucciones.parentNode.removeChild(botonInstrucciones);

            for (i = botoncitos.length - 1; i >= 0; i--) {
                botoncitos[i].parentNode.removeChild(botoncitos[i]);
            }
        }

    }

}

//Valido los campos
function ComprobarCampos() {

    let si = true;
    let TodosInputs = document.getElementsByTagName("input");
    for (i = 0; i < TodosInputs.length; i++) {
        TodosInputs[i].style = "border: none";
        let valor = TodosInputs[i].value;
        if (valor == "") {
            TodosInputs[i].style = "border: 1px solid red";
            si = false;
        }
        // TodosInputs[i].className == "numeros"
        else {
            switch (TodosInputs[i].className) {
                case "letras":
                    if (valor.length < 2 || valor.length > 30) {
                        TodosInputs[i].style = "border: 1px solid red";
                        si = false;
                    }
                    break;
                case "vida":
                    if (valor.length > 5 || valor.length < 4) {
                        TodosInputs[i].style = "border: 1px solid red";
                        si = false;
                    }
                    break;
                case "ataque":

                    if (valor.length > 3 || valor.length < 2) {
                        TodosInputs[i].style = "border: 1px solid red";
                        si = false;
                    }
                    break;
            }


        }

    }
    //Añado unas instrucciones
    if (si == false) {
        btnInstr.innerText = "El nombre y los apellidos deben tener entre 3 y 30 letras. \n La vida entre 4 y 5 dígitos. \n El ataque entre 2 y 3 dígitos.";
        btnInstr.style = "color: red";
    }

    return si;

}

//Función intermedia para el añadido o borrado de cartas, pasando carta a carta para dicha función
function GuardarCartas(Tipo) {
    let cartas = document.getElementsByClassName("card-body");
    var nom;
    var ape;
    var vida;
    var ataque;
    var img;
    if (Tipo == "Guardar") {

        for (i = 0; i < cartas.length; i++) {
            let Cont = cartas[i].parentNode.childNodes;
            img = Cont[0].src;
            inputs = cartas[i].childNodes;
            test = inputs[0].childNodes;
            nom = test[0].value;
            ape = inputs[1].value;
            vida = inputs[2].value;
            ataque = inputs[3].value;
            modificarCartas(nom, ape, vida, ataque, img, i, "Añadir");
        }
    }
    else {
        inputs = Tipo.childNodes;
        test = inputs[0].childNodes;
        nom = test[0].value;
        ape = inputs[1].value;
        vida = inputs[2].value;
        ataque = inputs[3].value;
        modificarCartas(nom, ape, vida, ataque, img, "Borrar");
    }
}

//Borde rojo para el editado
function Resaltar(SioNo) {

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

//////////////////  EVENTOS DE RATON  //////////////////
function Desbloquear(carta) {
    if (Editar == true) {
        var inputs = carta.getElementsByTagName("input");

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    }
}


function Bloquear(carta) {
    debugger;
    if (Editar == true) {
        var inputs = carta.getElementsByTagName("input");

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        return;
    }

}

//////////////////  FIN EVENTOS DE RATON  //////////////////


//Borro la carta en el DOM, pero no en la lista guardada
function BorrarCarta(boton) {

    var padre = boton.parentNode;
    let carta = padre.parentNode;
    let contendor = carta.parentNode;
    contendor.removeChild(carta);
    GuardarCartas(padre);

}


//Limitación de letras y numeros
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

/////////////////////  USO DE COOKIES  ////////////////////////////
function Pelea(n) {
    if (n != 0) {

        getObject = JSON.parse(localStorage.getItem("Personajes"));
        var listaIndices = new Array();
        var mayor = 0;
        let contendor = document.getElementById("ContenedorCartas").childNodes;

        for (i = 0; i < getObject.Personajes.length; i++) {
            let life = getObject.Personajes[i].vida;
            let attack = getObject.Personajes[i].ataque;
            let indice = life * (attack / 100);
            listaIndices[i] = indice;
            mayor = indice > mayor ? indice : mayor;
        }
        mayor = listaIndices.indexOf(mayor) + 1;
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
        cartaGanadora = contendor[mayor].childNodes;
        DatosGanador = cartaGanadora[1].childNodes;
        document.cookie = "Nombre" + "=" + DatosGanador[0].childNodes[0].value + ";";
        document.cookie = "Apellido" + "=" + DatosGanador[1].value + ";";
        document.cookie = "Vida" + "=" + DatosGanador[2].value + ";";
        document.cookie = "Ataque" + "=" + DatosGanador[3].value + ";";
        document.cookie = cartaGanadora[0].src;

    }

}


///////////////////  FIN DE USO DE COOKIES  //////////////////


//Función añadida para el personalizado del header
function Color(evento) {


    if (evento == null) {
        let vody = document.getElementsByTagName("body");
        let guia = document.getElementById("guiaColores");
        if (btnCustom.innerText == "Customizar color") {
            vody[0].setAttribute("onkeydown", "return Color(event)");
            document.getElementById("btnCustom").innerText = "Deja de customizar";
            guia.innerText = "W = White | Y = Yellow | R = Red | B = Blue";
        }
        else {
            vody[0].removeAttribute("onkeydown");
            guia.innerText = "";
            document.getElementById("btnCustom").innerText = "Customizar color";
        }
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

