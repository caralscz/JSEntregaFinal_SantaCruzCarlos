function fechaYhoraConLuxon(){
    // coloco la fecha y hora al pié de la página. Uso librería Luxon
    // se usa en todas las páginas 
    // debe tener definido <p id="fechahora"><p> donde va a ir la fecha
    var DateTime = luxon.DateTime;

    //Notas:
    //const FechaHoy = DateTime.now().toString();  // 2025-05-07T12:34:07.610-03:00
    //const FechaHoy = DateTime.now().toLocaleString();      //=> '7/5/2025'

    const FechaHoy = DateTime.now().toLocaleString(DateTime.DATETIME_MED); // 7 may 2025, 13:02
    let ppFechaHora = document.getElementById("fechahora");
    ppFechaHora.innerHTML = "Fecha "+ FechaHoy +"hs";
}