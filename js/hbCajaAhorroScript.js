 /** ========================================================
 * 
 * @description Entrega final. JS desde hbCajaAhorroPesos.html - Proyecto de Home banking
 * CoderHouse Comisión 86620 - año 2025
 * Pagina de Caja de ahorros 
 *
 * @author Carlos A. santa Cruz 
 *  
 * Las funciones no están habilitadas aún, se habilitarán en futuras entregas
 *
 * ======================================================== **/

    // estas variables las defino afuera de las funciones para que sean globales
    // y se las pueda usar en cualquier parte del programa
    
    const clUsuarioActivo = "UsuarioActivo"; // nombres dados a la variable de sessionStorage
    const clNombrePersona = "NombrePersona";    // nombre de la persona que se loguea

    let UsuarioActivo="";         // variable para guardar el nombre de usuario válido


    // =========================================================
    //
    // ejecuto la función inicio() al cargar la página
    //
    // =========================================================
    inicio(); 


function inicio() {
    // Verificar si hay un usuario activo
    // Si no existe, lo redirijo al index.html
    verificaUsuarioActivo();
            
    // coloco la fecha y hora al pié de la página. Uso biblioteca externa Luxon
    fechaYhoraConLuxon()

} // fin de la función inicio()


    // =========================================================
    //
    // Verificar si hay un usuario activo
    //
    // =========================================================
function verificaUsuarioActivo(){
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
        usuarioIdentificado.innerHTML ="Usuario: " + sessionStorage.getItem(clNombrePersona);  // coloco el nombre del usuario bajo el titulo // UsuarioActivo;
    } // fin de la función TratarUsuarioActivo()
    // =========================================================

    
// mensaje de aviso al usuario con la biblioteca externa SweetAlert2
// lo muestra cuando oprime el botón de "Depositar" o "Transferir"
function MensajeDeAvisoConSweetAlert() {
    Swal.fire({
        title: 'Funciones a implementar proximamente',
        html: `       
        Por ahora solo implementamos "Cambio de divisas"<br>
        <a href="../pages/hbCambioDeDivisas.html" class="UnBoton">Ir a cambio de divisas</a>
        `,
        icon: "info",  // warning, error, success, info, and question,
        theme: 'dark', // tema de la ventana: 'light', 'dark', 'auto', and 'borderless'
        background: '#000099', // color de fondo
        position: 'top-end', // posición de la ventana: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', and 'bottom-end' 
        draggable: true,  // se puede mover el mensaje con el mouse
        confirmButtonText: 'ok'
    });

} // Fin de la funcion MensajeDeAvisoConSweetAlert
    