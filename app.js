const btn = document.getElementById('btn');
const buscar = document.getElementById('buscador');
const container = document.getElementById('contenedor');
let turno = true;
let ubicacion = true;
let url;


        //-----------------------------------------------------
                // Verificar si el navegador es compatible con la geolocalización
                if ("geolocation" in navigator) {
                    // Obtener la ubicación actual del usuario
                    navigator.geolocation.getCurrentPosition(function(position) {
                      var lat = position.coords.latitude; // Latitud
                      var lon = position.coords.longitude; // Longitud
                      console.log(navigator)
                    
                      console.log("Tu ubicación actual es:");
                      console.log("Latitud: " + lat);
                      console.log("Longitud: " + lon);
                      url = url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9cede20363453297a279b68ed1cdb474&units=metric`
                      verClima(url)
                    });
                  } else {
                    console.log("La geolocalización no es compatible con este navegador.");
                  }
                 
    //------------------------------------------------------

btn.addEventListener('click', () => {
    ubicacion = false;
    if ( ubicacion === false ){
        console.log(buscar.value)
        url = url = `https://api.openweathermap.org/data/2.5/weather?q=${buscar.value}&appid=9cede20363453297a279b68ed1cdb474&units=metric`
        verClima(url);
    }else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9cede20363453297a279b68ed1cdb474&units=metric`
        verClima(url)
    }
})

function verClima(url) {
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        creaCard(data)
    })
}

function mostrarHora(){
    let dataHora = new Date()
    let hora = dataHora.getHours().toString();
    let minutos = dataHora.getMinutes().toString();
    
    if ( hora < 10 ) {
        hora = `0${hora}`
    }
    if (minutos < 10) {
        minutos = `0${minutos}`
    }
    if (hora > 18 || hora < 7 ) {
        turno = false
        console.log(turno)
        let fondo = document.getElementById('card')
        fondo.style.background='black';
    }else {
        turno = true;
        console.log(turno)
    }
    return `${hora}:${minutos} hs.`
}
function creaCard(data) {
    let dataFecha = new Date();
    let dia = dataFecha.getDate();
    let mes = dataFecha.getMonth().toString();
    let anio = dataFecha.getFullYear().toString();

    nombreCiudad.innerHTML = data.name;
    pais.innerHTML = data.sys.country;
    fecha.innerHTML = dia + '/'+ mes +'/' + anio;
    time.innerHTML = mostrarHora();
    icono.innerHTML = `<img src="./img/${data.weather[0].description}${turno == true ? 'Dia' : 'Noche'}.png" alt="${data.weather[0].description}" />`
    temperatura.innerHTML = Math.round(data.main.temp) + "ºc";
    MinMax.innerHTML = `Max: ${Math.round(data.main.temp_max)} º / Min: ${Math.round(data.main.temp_min)} º`
    viento.innerHTML = `Viento: ${data.wind.speed} km/h`
    descripcion.innerHTML = data.weather[0].description;
    console.log(`${data.weather[0].description}${turno == true ? 'Dia' : 'Noche'}.png`)
}
