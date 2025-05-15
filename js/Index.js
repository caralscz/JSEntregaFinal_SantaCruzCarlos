/** ========================================================
 * 
 * Java script para pagina index.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz
 *
 * @description Entrega final. JS desde index.html - Proyecto de Home banking
 *  
 * Funciones ejecutadas desde la página index.html
 * 
 *  Funciones JavaScript implementadas:
 * @funcion inicio() se ejecuta al cargar la página index.html
 *      - Se inicializan las variables de sessionStorage y se verifica si hay una sesión activa
 *  @function ValidarUnUsuario() se inicia cuando se hace click en el botón "Continuar" 
 *      del formulario de identificación donde se pide el nombre de usuario y password    
 *  @function VerificoUsuarioPassword verifica que sean correctos el usuario y password
 *      - Se ingresa a esta función desde ValidarUnUsuario()
 *        Si son correctos vamos a la pagina hbServicios.html
 *        y si son incorrectos se da un mensaje de error y queda en la pagina
 * 
 * ======================================================== **/

// ejecucion inicial al cargar la pagina 
// estas variables las defino afuera de las funciones para que sean globales
// y se las pueda usar en cualquier parte del programa

// otras varias de mis funciones
let TbDivisas = [];     // array de divisas existentes. Se lee desde un JSON
let TbUsuarioPw = [];   // array de usuarios, password , persona, ... existentes. Se lee desde un JSON
let UsuarioActivo;      // variable para guardar el nombre de usuario válido
let RecordarUsuario;    // variable para recordar el nombre de usuario válido
let NombrePersona;      // nombre de la persona que se loguea

const urlDBUsuariosJSON = './json/DBUsuarios.json'; // url del archivo JSON de usuarios 
const urlDBDivisasJSON = './json/DBDivisas.json'; // url del archivo JSON de divisas 

// nombres dados a las variables de sessionStorage
const clTbDivisas = "TbDivisas";   // tabla de divisas existentes para cambio
const clTbUsuarioPw = "TbUsuarioPw";   // tabla de usuarios,password, persona, servicio... existentes
const clUsuarioActivo = "UsuarioActivo";  // usuario activo
const clRecordarUsuario = "RecordarUsuario"; // recordar el usuario
const clNombrePersona = "NombrePersona"; // nombre de la persona que se loguea

// ***
// Llama a la función cuando la página se carga
window.onload = Inicio();

// ========================================================


async function Inicio() {
    /**
    *
    * @function inicio() Se ejecuta al cargar la página index.html
    *           es asyncrona porque va a leer el archivo JSON de usuarios y de divisas
    * 
    * ======================================================== 
    
    **/

    // coloco la fecha y hora al pié de la página. Uso librería Luxon
    fechaYhoraConLuxon()

    // ======================================================== 
    // Miramos si hay una session válida activa, para lo cual unas variables 
    // de sessionStorage deben tener un valor, no deben estar vacías

    //
    // Trabajamos la tabla de usuarios y password válidos
    // Verifico si la variable de sessionStorage "TbUsuarioPw" existe y tiene un valor
    const TbUsuarioPwJSON = sessionStorage.getItem(clTbUsuarioPw);

    if (TbUsuarioPwJSON) {   // ¿tiene algo adentro ?
        // Si existe, convierto la cadena JSON de nuevo a un array JavaScript
        TbUsuarioPw = JSON.parse(TbUsuarioPwJSON);  // Ahora es un array normal

    } else {
        // Si no está cargada la variable de session :
        //  - voy a leer los usuarios y password válidos,
        //    leyendo un archivo JSON porque no tengo una base de datos real
        //  - Cargo en la tabla TbUsuarioPw[]
        // 

        // Llamo a la función que lee el JSON y carga la tabla de usuarios
        TbUsuarioPw = await leerTBUsuariosJSON(); // TbUsuarioPw = [] (usuarios, password, productos,... válidos)

        // Convierto el array a una cadena JSON antes de guardarlo
        // y lo guardo en una variable de sessionStorage
        sessionStorage.setItem(clTbUsuarioPw, JSON.stringify(TbUsuarioPw));

    } // Fin del if

    //
    // Trabajamos la tabla de Divisas existentes
    // Verifico si la variable de sessionStorage "TbDivisas" existe y tiene un valor
    const TbDivisasJSON = sessionStorage.getItem(clTbDivisas);

    if (TbDivisasJSON) {   // ¿tiene algo adentro ?
        // Si existe, convierto la cadena JSON de nuevo a un array JavaScript
        TbDivisas = JSON.parse(TbDivisasJSON);  // Ahora es un array normal

    } else {
        // Si no está cargada la variable de session :
        //  - voy a leer las divisas existentes
        //    leyendo un archivo JSON porque no tengo una base de datos real
        //  - Cargo en la tabla TbDivisas[]
        // 

        // Llamo a la función que lee el JSON y carga la tabla de divisas (está en otro archivo .js)
        TbDivisas = await leerTBDivisasJSON(); // TbDivisas = [] (moneda,tipo,compra,venta, ... válidos)

        // Convierto el array a una cadena JSON antes de guardarlo
        // y lo guardo en una variable de sessionStorage
        sessionStorage.setItem(clTbDivisas, JSON.stringify(TbDivisas));
    } // Fin del if

    // ***
    // Trabajamos con las variables clRecordarUsuario y clUsuarioActivo
    // Verifico si existen y tienen un valor
    RecordarUsuario = sessionStorage.getItem(clRecordarUsuario);
    UsuarioActivo = sessionStorage.getItem(clUsuarioActivo);
    NombrePersona = sessionStorage.getItem(clNombrePersona);

    const nombreUsuarioInput = document.getElementById("idNombreUsuario");  // Input de nombre de usuario
    const claveInput = document.getElementById("idClave");  // Input de clave de usuario

    if (RecordarUsuario && UsuarioActivo) {         // ¿dice que reecordar si y tiene un usuario válido?
        nombreUsuarioInput.value = UsuarioActivo;   // Asignar el valor al input de nombre de usuario
        claveInput.value = "";                      // No debe quedar la password en el casillero
        // ***
        // coloco el nombre del usuario bajo el titulo a la derecha
        let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
        usuarioIdentificado.innerHTML = " ;Usuario: " + NombrePersona; //UsuarioActivo;

    } else {
        nombreUsuarioInput.value = "";  // Borra lo que haya en el input de nombre de usuario
        claveInput.value = "";          // y de la password en el casillero
        UsuarioActivo = "";             // Borra lo que haya en la variable
        NombrePersona = "";             // Borra lo que haya en la variable
    }
    // ***

    // aquí tratamos el botoncito con el signo de pregunta que dice "ayuda" 
    // es el que está al lado del usuario en el formulario

    // Seleccionar la imagen
    const iconoAyuda = document.querySelector('.iconoAyuda');

    // Guardar la ruta de la imagen original
    const imagenOriginal = './assets/img/questionmarkcircleoutline_110819.png';
    // Ruta de la imagen al pasar el mouse
    const imagenHover = './assets/img/questionmarkcircle_110957.png';

    // Cambiar la imagen cuando el mouse pasa sobre ella
    iconoAyuda.addEventListener('mouseover', function () {
        this.src = imagenHover;
    });

    // Restaurar la imagen original cuando el mouse sale
    iconoAyuda.addEventListener('mouseout', function () {
        this.src = imagenOriginal;
    });

    // Añadir el evento de clic para llamar a mostrarAyuda()
    iconoAyuda.addEventListener('click', function () {
        MensajeDeAyudaConSweetAlert();
    });

} // Fin de la función Inicio
// ========================================================


function ValidarUnUsuario() {
    /** ======================================================== 
    *
    * @function ValidarUnUsuario
    * @description Validación de usuario y password
    * 
    * Ingresamos aquí desde la página index.html como respuesta al evento click
    * en el boton submit que dice "Continuar" del formulario de identificación
    * 
    * Se pide el nombre de usuario y password y
    * si son correctos se va a la pagina de los servicios
    *
    * ======================================================== **/

    if (ControlarUsuarioPassword()) {     // voy a controlar el usuario y password
        // si el usuario y password son correctos
        // Borro el mensaje de error al usuario y 
        // Hago visible los botones de ingresar a los servicios
        HabilitarServicios(true);

        return true; // todo ok

    } else {  // si algo no está bien
        event.preventDefault(); // Evita que el formulario se envíe

        // Muestro el mensaje de error al usuario
        // si hubiera algo mas, se hace allí
        HabilitarServicios(false);

        // Mando un mensaje de error al usuario con sweetAlert
        MensajeDeSweetAlert()

        return false; // algo está mal

    } // Fin del if

} // Fin de la función ValidarUnUsuario
// ========================================================

function ControlarUsuarioPassword() {
    /** ======================================================== 
     * @function ControlarUsuarioPassword
     * @description Controlo de nombre de usuario y password
     * @returns {boolean} true si el usuario y password son correctos, false si no lo son
     *
     * Se ingresa a esta función desde ValidarUnUsuario() 
     * La tabla TbUsuarioPw = [] (usuarios y password válidos) se carga en la función Inicio()
     *
     * ======================================================== **/
    // rescato los valores ingresados por el usuario en el formulario
    // y los guardo en las variables nombreUsuario y clave
    const nombreUsuario = document.getElementById("idNombreUsuario").value;
    const clave = document.getElementById("idClave").value;

    // Mira si el usuario está en la tabla de usuarios y password
    const elementoBuscado = TbUsuarioPw.find((producto) => producto.usuario === nombreUsuario && producto.clave === clave);
    if (elementoBuscado) {
        // Si el usuario y password son correctos, guardo el usuario en sessionStorage
        sessionStorage.setItem(clUsuarioActivo, nombreUsuario); // Guardar el usuario activo
        sessionStorage.setItem(clRecordarUsuario, true); // Guardar la opción de recordar usuario
        sessionStorage.setItem(clNombrePersona, elementoBuscado.persona); // Guardar nombre de la persona
        return true;    // usuario y password correctos
    }

    return false; // usuario y/o password incorrectos

} // Fin de la función ControlarUsuarioPassword
// ======================================================== 

// mensaje de error al usuario con la librería SweetAlert2
// lo muestra cuando el usuario y/o la password son incorrectos
function MensajeDeSweetAlert() {
    Swal.fire({
        title: 'Debe ingresar un nombre de usuario y password válidos',
        text: 'En los comentarios mas abajo,  hay una lista para esta prueba!',
        icon: "error",  // warning, error, success, info, and question,
        theme: 'dark', // tema de la ventana: 'light', 'dark', 'auto', and 'borderless'
        background: '#006600', // color de fondo
        position: 'top', // posición de la ventana: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', and 'bottom-end' 
        draggable: true,  // se puede mover el mensaje con el mouse
        confirmButtonText: 'ok'
    });

} // Fin de la funcion MensajeDeSweetAlert

// mensaje de error al usuario con la librería SweetAlert2
// lo muestra cuando el usuario y/o la password son incorrectos
function MensajeDeAyudaConSweetAlert() {
    Swal.fire({
        title: 'Debe ingresar un nombre de usuario y password válidos',
        html: `       
        Los usuarios posibles son: <br>
        "u1", "p1" <br>
        "usuario1", "password1" <br>
        "usuario2", "password2"<br>
        "usuario3", "password3"<br>
        `,
        icon: "info",  // warning, error, success, info, and question,
        theme: 'dark', // tema de la ventana: 'light', 'dark', 'auto', and 'borderless'
        background: '#000099', // color de fondo
        position: 'top-end', // posición de la ventana: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', and 'bottom-end' 
        draggable: true,  // se puede mover el mensaje con el mouse
        confirmButtonText: 'ok'
    });

} // Fin de la funcion MensajeDeAyudaConSweetAlert

function HabilitarServicios(siHabilitar) {
    // ========================================================
    //
    //  Se usa desde la funcion ValidarUnUsuario() para habilitar o deshabilitar
    //  funciones dependiendo si se identificó bien o no el usuario
    //
    // ========================================================

    let msgError = document.getElementById("idError");

    if (siHabilitar) {
        msgError.style.display = "none"; // Ocultar el mensaje de error al usuario

    } else {
        msgError.style.display = "block"; // Mostrar el msgError
    }
} // Fin de la función HabilitarServicios
// ========================================================

// Si oprime la función "Salir" del menú , se borran las variables de sessionStorage
function salir() {
    // No borra la tabla de usuarios, porque no es necesario

    // Borra variables globales
    UsuarioActivo = "";         // variable para guardar el nombre de usuario válido
    RecordarUsuario = "";       // variable para recordar el nombre de usuario válido
    NombrePersona = "";         // nombre de la persona que se loguea

    // Borra variables de sessionStorage
    sessionStorage.setItem(clUsuarioActivo, ""); // usuario activo
    sessionStorage.setItem(clRecordarUsuario, ""); // la opción de recordar usuario
    sessionStorage.setItem(clNombrePersona, ""); // nombre de la persona

    // borro el nombre del usuario bajo el titulo a la derecha
    let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
    usuarioIdentificado.innerHTML = "Usuario no identificado";

    // borro el nombre del usuario del formulario de identificación
    const nombreUsuarioInput = document.getElementById("idNombreUsuario");  // Input de nombre de usuario
    nombreUsuarioInput.value = "";  // Borra lo que haya en el input de nombre de usuario"

}
