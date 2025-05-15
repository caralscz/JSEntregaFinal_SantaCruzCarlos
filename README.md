<h1>Curso de Java Script  -  Carlos A. Santa Cruz</h1>
<h2>CoderHouse - Entrega final - Comisión 86620</h2>


Profesor: Julio Avantt<br>
Adjunto o tutor: Alexis Coronel<br>
Abril de 2025<br>


<h3>Proyecto de Home banking </h3>


El proyecto tiene 4 HTML: <br>
- El index.html es donde el usuario debe identificarse<br>
- La pag hbServicios.html que se ingresa desde el index y permite acceder a las otras dos:<br>
- La pag hbCambioDeDivisas.html están implementadas con JS interactuando con HTML<br>
- La pág hbCajaDeAhorroPesos.html que no está implementada<br>


En la entrega final se implementan las funciones de las páginas<br>
en Java Script para cumplir la consigna:
- Que el JS interactúe con HTML, por ejemplo los formularios y botones de servicios<br>
- Se usa la librería luxon.js para colocar la fecha al pié de página.<br>
- Se usa la librería sweetalert2 para mostrar los mensajes de error en el formulario de identificacion.<br>
- Se leen archivos .json para simular la lectura de una DB, tanto para usuarios como para monedas.<br> 
- Se usan variables de sessionStorage para guardar el usuario identificado ylos archivos .json leidos para ser utilizado durante toda la session.<br>

Servicios implementados: Cambio de divisas<br>
Con los elementos leídos de un archivo .json armamos la página de "Cambio de divisas"<br>


En la página inicial el usuario debe identificarse para ingresar a los servicios<br>
Allí pide un nombre de usuario y password válidos<br>
Los usuarios posibles son:<br>
"u1", "p1"<br>
"usuario1", "password1"<br>
"usuario2", "password2"<br>
Debe hacer click en el botón "Continuar"<br>


Si se verifica que son correctos, una variable de sessionStorage se carga <br>
con el nombre de usuario y se accede a la pag de los servicios<br>
y si son incorrectos da un mensaje de error<br>

Luego, en todas las paginas se verifica que exista un usuario identificado.<br>
Si no se verifica, lo redireccionamos a inicio.html para que se identifique<br>


Nota: En los formularios no pude utilizar metodo POST, por ese motivo
utilizé método GET que muestra los datos <br>


Desde Servicios podrá ingresar : <br>
-  Función de Cambio de divisas es la que está implementada y<br>
-  Función de Caja de ahorro que está pendiente de implementación<br>
     
     
