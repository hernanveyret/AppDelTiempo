// busca por ciudad o pais
"https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// Buscar por corrdenadas latitud y longitud
const algo = "https://api.openweathermap.org/data/2.5/weather?lat=-58.410868&lon=-34.731089&appid=9cede20363453297a279b68ed1cdb474&units=metric"
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const btn = document.getElementById('btn');
const buscar = document.getElementById('buscador');
const container = document.getElementById('contenedor');

btn.addEventListener('click', () => {
   verClima(buscar.value);
   buscar.innerHTML= ''
})

function verClima(ciudad) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=9cede20363453297a279b68ed1cdb474&units=metric`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        creaCard(data)

        
        //console.log(data)
        
       
        console.log("Temp. Max: "+ Math.round(data.main.temp_max) + "ºc");
        console.log("Temp. Min: "+ Math.round(data.main.temp_min) + "ºc");
        console.log("Humedad: ",data.main.humidity,"%");
        console.log("Vel. Viento: ",data.wind.speed,"km/h", data.wind.deg,"º");
        console.log("Descripcion:", data.weather[0].description);
    
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
        console.log('es mayor')
        let fondo = document.getElementById('card')
        fondo.style.background='black';
    }
    return `${hora}:${minutos}`
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
    icono.innerHTML = `<img src="./img/${data.weather[0].description}.png" alt="${data.weather[0].description}" />`
    temperatura.innerHTML = Math.round(data.main.temp) + "ºc";
    viento.innerHTML = `Viento: ${data.wind.speed} km/h`
    descripcion.innerHTML = data.weather[0].description;

}
