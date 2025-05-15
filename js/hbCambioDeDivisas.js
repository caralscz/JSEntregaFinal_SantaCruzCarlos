/**
 * 
 * Java script para pagina hbCambioDeDivisas.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz 
 *
 * @description Entrega final. JS desde hbCambiodeDivisas.html -  Proyecto de Home banking
 * 
 * Función sistema de Compra y Venta de Monedas
 * 
 * Este script permite realizar operaciones de compra y venta de 
 * monedas extranjeras (Dólar y Euro) utilizando Pesos Argentinos (AR$).
 * 
 * Proceso:
 * . Verifica si hay un usuario activo, si no lo hay redirige a index.html
 * . Obtiene las tasas de cambio desde la tabla TbDivisas cargada en sessionStorage
 * . Permite al usuario seleccionar la moneda con la que desea operar
 * . Permite elegir entre comprar o vender dicha moneda
 * . Solicita la cantidad a operar
 * . Calcula e informa el monto final en Pesos Argentinos
 * 
 **/

// estas variables las defino afuera de las funciones para que sean globales
// y se las pueda usar en cualquier parte del programa
let TbDivisas = [];     // array de divisas existentes. La cargo desde sessionStorage

// nombres dados a las variables de sessionStorage
const clTbDivisas = "TbDivisas";   // tabla de divisas existentes para cambio
const clUsuarioActivo = "UsuarioActivo";    // nombres dados a la variable de sessionStorage
const clNombrePersona = "NombrePersona";    // nombre de la persona que se loguea

let UsuarioActivo = "";         // variable para guardar el nombre de usuario válido
let NombrePersona = "";         // nombre de la persona que se loguea
let mensajeFinal = ""; // variable para guardar el mensaje final

/**
* 
* Ejecutar inicio cuando se carga la página
*
*/

// Llama a la función cuando la página se carga
window.onload = inicio();


// Función principal que inicia el sistema de compra/venta de divisas
function inicio() {

    // Control de seguridad. Verificar si hay un usuario activo
    verificaUsuarioActivo();  // si NO hay, regresa a inicio.html 
    
    // coloco la fecha y hora al pié de la página. Uso librería Luxon
    fechaYhoraConLuxon()

    // Llama a la función para iniciar el sistema de monedas
    obtenerTasasCambio();

} // fin de la función inicio()

/**
 * @function CalcularCambioDivisas  viene desde el formulario de cambio de divisas
 * 1. lee los valores ingresados por el usuario
 * 2. valida los mismos y en caso de valor incorrecto, avisa el error
 * 3. calcula el resultado final de la operación y muestra el resultado al usuario
 */
function CalcularCambioDivisas() {
    // Borramos mensajes anteriores 
    mensajeFinal = ""; // Reinicio el mensaje final para evitar que se acumulen mensajes de errores anteriores

    // Llama a la función para leer los valores del formulario
    // y calcular el resultado de la operación
    let TodoBien = LeerValoresDelFormulario();

    if (!TodoBien) {
        // Si TodoBien es falso, significa que hubo un error en la operación
        mensajeFinal = mensajeFinal + "Operación fallida.";
    }

    // Mostrar mensaje final al usuario
    // ==========================================================

    let msgError = document.getElementById("idError");
    msgError.innerHTML = mensajeFinal; // Coloco el mensaje que se generó antes
    msgError.style.display = "block"; // Mostrar el msgError

    // no sale nunca de aqui, porque el formulario no se envía
    // y no se redirige a otra página
    // salvo que el usuario haga click en la funcion de salida
    event.preventDefault(); // Evita que el formulario se envíe

} // fin de la función CalcularCambioDivisas()
// =========================================================

function LeerValoresDelFormulario() {
    // 1.  solicitar la moneda con la que se desea operar
    const monedaElegida = solicitarMoneda(); // corresponde a index en TbDivisas

    // Verificar si el usuario ingresó una moneda válida
    // caso contrario, no continuamos con el proceso
    if (!monedaElegida) return null;

    // 2. Solicitar el tipo de operación (comprar o vender)
    const tipoOperacion = solicitarTipoOperacion();

    // Verificar si el usuario ingresó una operación válida
    // de no ser así, no continuamos con el proceso
    if (!tipoOperacion) return null;

    // 3. Solicitar la cantidad que el usuario desea comprar o vender
    const cantidad = solicitarCantidad();

    // Verificar si el usuario ingres+o un importe válido
    // de no ser así, no continuamos con el proceso
    if (!cantidad) return null;

    // 4. Calcular el resultado final de la operación
    return (calcularResultado(monedaElegida, tipoOperacion, cantidad));
}

// =========================================================
//
// Verificar si hay un usuario activo
//
// =========================================================
function verificaUsuarioActivo() {
    // ======================================================== 
    //
    // Miramos si hay una session válida activa, para lo cual la variable de sessionStorage
    // deben tener un valor, no deben estar vacías
    // rescato el nombre del usuario activo es esta sessionStorage
    // 
    // ======================================================== 

    // ***
    UsuarioActivo = sessionStorage.getItem(clUsuarioActivo);  // definido al principio
    if (UsuarioActivo) {   // ¿tiene algo adentro ?
        // Si existe, lo muestro en la parte superior de la pagina debajo del titulo
        TratarUsuarioActivo(); // muestro el nombre del usuario activo
    }
    else {
        // Si no existe, lo redirijo a la página de identificación
        window.location.href = "../index.html"; // redirijo a la pagina de index.html
    }

} // fin de la función verificaUsuarioActivo()

// ***
function TratarUsuarioActivo() {
    // ======================================================== 
    //
    // Coloca el nombre del usuario activo en la parte superior 
    // de la pagina debajo del titulo
    // 
    // ======================================================== 

    // ***
    let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
    usuarioIdentificado.innerHTML = "Usuario: " + sessionStorage.getItem(clNombrePersona);  // coloco el nombre del usuario bajo el titulo // UsuarioActivo;
} // fin de la función TratarUsuarioActivo()
// =========================================================


/**
 * 1. Obtiene las tasas de cambio desde los elementos HTML
 * @returns {Object} Objeto con las tasas de compra y venta para Dólar y Euro
 *
 **/
function obtenerTasasCambio() {
    // cargar TbDivisas desde el sessionStorage
    TbDivisas = JSON.parse(sessionStorage.getItem(clTbDivisas)); // leemos el JSON de divisas desde sessionStorage
    //TbDivisas = sessionStorage.getItem(clTbDivisas); // leemos el JSON de divisas desde sessionStorage
    // Agregamos los div necesarios para las divisas
    TbDivisas.forEach(agregarNuevaDivisa);

    /*
        let lista = document.getElementById('lista');
        let nuevoItem = document.createElement('li');
        nuevoItem.textContent = 'Nuevo ítem';
        lista.appendChild(nuevoItem);
     
     // Hacer así dice que tiene riezgos de seguridad, ya que el usuario 
     // puede inyectar código malicioso en el HTML. Pero en realidads es más fácil de usar
     // y no es necesario crear cada uno de los elementos por separado.
     function agregarNuevaDivisaConInnerHTML() {
      // 1. Obtiene el elemento padre donde se agregará la nueva divisa
      const contenedorCambioDivisas = document.querySelector('.cambioDivisas');
      // 2. Crea la cadena HTML para el nuevo div
      const nuevoHTML = '<div class="cambioDivisasUna"><h3>Dólar</h3><p>Compra: ...</p></div>';
      // 3. Agrega el HTML al contenedor
      contenedorCambioDivisas.innerHTML += nuevoHTML;
    }
    */
    /*  
    * Sintaxis de objetos: 
     * La sintaxis { clave1: valor1, clave2: valor2, ... } se utiliza para crear objetos literales.
     * clave1, clave2, etc., son los nombres de las propiedades.
     * valor1, valor2, etc., son los valores asignados a esas propiedades.
     * En la función obtenerTasasCambio() se usaba esta sintaxis, 
     *      creamos un objeto que tiene dos propiedades: dolar y euro. 
     *      Cada una de estas propiedades es, a su vez, otro objeto 
     *      con las propiedades compra y venta.
     * Esto no es necesario porque ya están disponibles en TbDivisas
        return {
            dolar: {
                compra: parseFloat(document.getElementById("idCompraDolar").innerText),
                venta: parseFloat(document.getElementById("idVentaDolar").innerText)
            },
            euro: {
                compra: parseFloat(document.getElementById("idCompraEuro").innerText),
                venta: parseFloat(document.getElementById("idVentaEuro").innerText)
            }
        };
    */
}

function agregarNuevaDivisa(UnaMoneda, index) {
    // Aquí entramos una vez por cada divisa que hay en TbDivisas
    // y armamos el HTML para cada una de ellas
    //  
    // Primero: armo la pizarra de valores de divisas 
    //
    // 1. Obtener el elemento padre donde se agregará la nueva divisa
    const contenedorCambioDivisas = document.querySelector('.cambioDivisas');

    // 2. Crear el nuevo elemento div con la class="cambioDivisasUna"
    const nuevaDivisaDiv = document.createElement('div');
    nuevaDivisaDiv.classList.add('cambioDivisasUna');

    // 3. Crear el elemento h3 para el nombre de la divisa
    const h3Divisa = document.createElement('h3');
    // nombre de la divisa
    // h3Divisa.textContent = `${TbDivisas[0].moneda} (${TbDivisas[0].tipo})`; 
    h3Divisa.textContent = `${UnaMoneda.moneda} (${UnaMoneda.tipo})`;

    // 4. Crear el elemento p para el valor de compra de la divisa 
    const pValorCompra = document.createElement('p');
    pValorCompra.textContent = `Compra: $ ${UnaMoneda.compra}`;

    // 5. Crear el elemento p para el valor de venta de la divisa 
    const pValorVenta = document.createElement('p');
    pValorVenta.textContent = `Venta: $ ${UnaMoneda.venta}`;

    // 6. Agregar el h3 y los p al nuevo div
    nuevaDivisaDiv.appendChild(h3Divisa);
    nuevaDivisaDiv.appendChild(pValorCompra);
    nuevaDivisaDiv.appendChild(pValorVenta);

    // 7. Agregar el nuevo div al contenedor principal
    contenedorCambioDivisas.appendChild(nuevaDivisaDiv);

    //
    // Segundo: Agregamos la lista (radio) de las Monedas (divisas) a operar 
    //

    // Obtener el elemento <p> después del cual queremos agregar las nuevas opciones
    const parrafoMoneda = document.querySelector('.formMonedaAOperar');

    // Para cada nueva moneda, crear los elementos y agregarlos al DOM
    // Crear el input radio
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = UnaMoneda.id;
    radioInput.name = 'fMonedaElegida';
    radioInput.value = index; // Guardar el índice de la moneda en el valor del radio button

    // Crear la etiqueta (label)
    const label = document.createElement('label');
    label.setAttribute('for', UnaMoneda.id);
    label.textContent = UnaMoneda.moneda + " " + UnaMoneda.tipo;

    // Crear un salto de línea
    const saltoLinea = document.createElement('br');

    // Insertar los elementos después del párrafo de título
    parrafoMoneda.insertAdjacentElement('afterend', saltoLinea);
    parrafoMoneda.insertAdjacentElement('afterend', label);
    parrafoMoneda.insertAdjacentElement('afterend', radioInput);
}

/**
 * 
 * Lee del formulario de Cambio de Divisas
 * y devuelve el valor de la moneda elegida por el usuario
 * @function solicitarMoneda : miramos con que moneda decide operar
 * @returns {string|null} La moneda elegida ('dolar' o 'euro') o null si no elige
 * 
 */
function solicitarMoneda() {

    const monedaRadioButtons = document.querySelectorAll('input[name="fMonedaElegida"]');
    for (const unRadioButton of monedaRadioButtons) {
        if (unRadioButton.checked) {
            return unRadioButton.value;  // corresponde a UnaMoneda.id
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "Debe seleccionar una moneda para operar.<br>";
    return null; // Devuelve null si no hay ninguna opción seleccionada

}  // fin de la función solicitarMoneda()
// =========================================================

/**
 * Lee del formulario de Cambio de Divisas
 * y devuelve el valor de la operación elegida por el usuario
 * @function solicitarTipoOperacion : miramos que operación decide realizar
 * @returns {string|null} El tipo de operación ('comprar' o 'vender') o null si no elige
 */
function solicitarTipoOperacion() {

    const operacionRadioButtons = document.querySelectorAll('input[name="fOperacionElegida"]');
    for (const unRadioButton of operacionRadioButtons) {
        if (unRadioButton.checked) {
            return unRadioButton.value;  // compra o venta
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "Debe seleccionar una operacion para operar.<br>";
    return null; // Devuelve null si no hay ninguna opción seleccionada

}  // fin de la función solicitarTipoOperacion()
// =========================================================

/**
 * 
 * Solicita al usuario la cantidad de moneda para la operación
 * @returns {number|null} La cantidad de moneda o null si es invalido
 * 
 */
function solicitarCantidad() {
    // Leo el valor ingresado por el usuario en el formulario
    const importeInput = document.getElementById('fImporteOperacion');
    if (importeInput) {
        const importe = importeInput.value.trim(); // Elimino espacios en blanco al principio y al final
        // y voy a Verificar si es numérico
        if (esNumerico(importe)) {
            return importe; // Devuelve el valor ingresado por el usuario
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "El valor ingresado no es numérico.<br>";
    return null; // Devuelve null si el valor no es numérico 
} // fin de la función solicitarCantidad()
// =========================================================

// Función para validar si un valor es numérico
function esNumerico(valor) {
    return /^\d+(\.\d+)?$/.test(valor);
}

/**
 * 
 * Calcula e informa el resultado final de la operación
 * @param {string} moneda - La moneda elegida ('dolar' o 'euro')
 * @param {string} operacion - El tipo de operación ('comprar' o 'vender')
 * @param {number} cantidad - La cantidad de moneda para la operación
 * 
 */
function calcularResultado(moneda, operacion, cantidad) {
    let montoTotal = 0;
    let tasa = 0;
    let monedaNombre = "";

    tasa = operacion === "vender" ? TbDivisas[moneda].venta : TbDivisas[moneda].compra;
    monedaNombre = TbDivisas[moneda].moneda + " " + TbDivisas[moneda].tipo; // nombre de la moneda

    // Calcula el monto total en pesos argentinos
    montoTotal = cantidad * tasa;

    // Preparar mensaje según tipo de operación
    if (operacion === "comprar") {

        mensajeFinal = mensajeFinal + `Para comprar ${cantidad} ${monedaNombre},<br> deberá depositar AR$ ${montoTotal.toFixed(2)}`;
    } else { // vender
        mensajeFinal = mensajeFinal + `Por vender ${cantidad} ${monedaNombre},<br> recibirá AR$ ${montoTotal.toFixed(2)}`;
    }

    return true; // Indica que la operación fue exitosa

}  // fin de la función calcularResultado()
