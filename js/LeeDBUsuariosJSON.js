/** ========================================================
* 
* Este JavaScript es llamado desde index.html para cargar la 
*      tabla de usuarios desde el archivo DBUsuarios.json para 
*      luego cargarla en una tabla interna como sessionStorage.
* Si fuera una Db real, se haría una consulta a la base de datos
* 
* CoderHouse Comisión 86620 - año 2025
* Entrega final. JS llamado desde index.html
* Proyecto de Home banking - inicial Cambio de divisas
*
* @file js/LeeDBUsuariosJSON.js
* @description  Funciones para leer el archivo JSON de usuarios
* @function leerTBUsuariosJSON() se ejecuta desde inicio() una sola vez por session
* @author Carlos A. santa Cruz
*  
* ======================================================== **/


async function leerTBUsuariosJSON() {
    let msgError = document.getElementById("idError2"); // Mensaje de error al usuario

    const Encontro = await leeArchivoJSON();

    if (Encontro) {
        msgError.style.display = "none"; // Ocultar el mensaje de error al usuario
    } else {
        msgError.style.display = "block"; // Mostrar el msgError
    }
    return Encontro; // Devuelve el resultado de la búsqueda

} // fin de la función leerTBUsuariosJSON


async function leeArchivoJSON() {
    // const urlDBUsuariosJSON está definido en el archivo Index.js como variable global
    try {
        const respuesta = await fetch(urlDBUsuariosJSON); // Realiza la solicitud al archivo JSON
        if (!respuesta.ok) {
            throw new Error(`HTTP error002! status: ${respuesta.status}`); // Si la respuesta no es OK, lanza un error
        }
        const objetoJavaScript = await respuesta.json(); // Convierte la respuesta a JSON (stream).
                                                  // Lee el cuerpo de la respuesta como
                                                  // un stream y lo parsea como un objeto 
                                                  // JavaScript a partir del formato JSON.

        // retorna con la tabla de usuarios
        return objetoJavaScript.productos; // Devuelve el array de productos (usuarios)

    } catch (error) {
        return false; // Devuelve false si hay un error
    }
}; // fin de la función leeArchivoJSON

// =========================================================
