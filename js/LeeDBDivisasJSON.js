/** ========================================================
* 
* Este JavaScript es llamado desde index.html para cargar la 
*      tabla de divisas posibles desde el archivo DBDivisas.json para 
*      luego cargarla en una tabla interna como sessionStorage.
* Si fuera una Db real, se haría una consulta a la base de datos
* 
* CoderHouse Comisión 86620 - año 2025
* Entrega final. JS llamado desde index.html
* Proyecto de Home banking - inicial Cambio de divisas
*
* @file js/LeeDBDivisasJSON.js
* @description  Funciones para leer el archivo JSON de divisas 
* @function leerTBDivisasJSON() se ejecuta desde inicio() una sola vez por session
* @author Carlos A. santa Cruz
*  
* ======================================================== **/

async function leerTBDivisasJSON() {
    let msgError3 = document.getElementById("idError3"); // Mensaje de error al usuario
    msgError3.style.display = "none"; // Ocultar el mensaje de error al usuario

        try {
            // Leer el archivo JSON
            const TbDivisas = await leemosElJSON();
          
            // Guardar en sessionStorage
            sessionStorage.setItem(clTbDivisas, JSON.stringify(TbDivisas));
          
            // Confirmar que se ha guardado
            return TbDivisas; // Retornar la tabla JavaScript
        } catch (error) {
            ErrorFatal = true; // Se produjo un error fatal
            sessionStorage.setItem(clErrorFatal,true); // mensaje de error fatal
            msgError3.style.display = "block"; // Mostrar el msgError
        }
      }
      
// Función para leer el archivo JSON
async function leemosElJSON() {
        // const urlDBDivisasJSON está definido en el archivo Index.js como variable global
        try {
          const respuesta = await fetch(urlDBDivisasJSON);
          
          if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
          }
          
          // todo ok  
          // Convierte la respuesta a JSON (stream).
          
          const data = await respuesta.json();
          return data.divisas;
        } catch (error) {
          throw error; // Re-lanzar el error para que lo maneje la función que llamó
        }
      }
      
