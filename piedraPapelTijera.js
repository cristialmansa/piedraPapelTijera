// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

const imagenes = document.querySelectorAll('#jugador img')

for (let i=0; i < imagenes.length; i++)
{
    imagenes[i].src = `img/${posibilidades[i]}Jugador.png`
    imagenes[i].addEventListener('click', () => 
    {
        for(let j=0; j < imagenes.length; j++)
        {
            if ( j == i )
            {
                imagenes[j].classList.toggle('seleccionado')
                imagenes[j].classList.toggle('noSeleccionado')
            } else if (imagenes[j].classList.contains('seleccionado')) {
                imagenes[j].classList.toggle('seleccionado')
                imagenes[j].classList.toggle('noSeleccionado')
            }
            
        } 
    })
}

const nombreJugador = document.querySelector('input[name="nombre"]')
const numeroPartidas = document.querySelector('input[name="partidas"]')
const botonJugar = document.querySelector('button:first-of-type')
var spanTotal = document.getElementById('total')

botonJugar.addEventListener('click', () => 
{
    const nombreLongitud = nombreJugador.value.trim()
    const partidas = parseInt(numeroPartidas.value.trim())

    if (nombreLongitud.length < 3)
    {
        nombreJugador.classList.add('fondoRojo')
        alert('El nombre debe tener al menos tres caracteres')
    } else if (nombreLongitud.startsWith('0') || nombreLongitud.startsWith('1') || nombreLongitud.startsWith('2') || nombreLongitud.startsWith('3') || nombreLongitud.startsWith('4') || nombreLongitud.startsWith('5') || nombreLongitud.startsWith('6') || nombreLongitud.startsWith('7') || nombreLongitud.startsWith('8') || nombreLongitud.startsWith('9')){
        alert('El nombre no debe comenzar por un número')
        nombreJugador.classList.add('fondoRojo')
    } else {
        nombreJugador.classList.remove('fondoRojo')
        nombreJugador.disabled = true
    }
    console.log(partidas)

    if (partidas <= 0) {
        alert('Debes seleccionar al menos una partida');
        numeroPartidas.classList.add('fondoRojo')
    } else {
        numeroPartidas.classList.remove('fondoRojo')
        numeroPartidas.disabled = true
        spanTotal.textContent = partidas
    }

})

const imagenMaquina = document.querySelector('#maquina img')
const botonYa = document.querySelector('h2 button')
var spanActual = document.getElementById('actual')
var partidasJugadas = 0
var historial = document.getElementById('historial')

botonYa.addEventListener('click', () => 
{
    const aleatorio = Math.floor(Math.random() * posibilidades.length)
    const jugadaMaquina = posibilidades[aleatorio]
    imagenMaquina.src = `img/${jugadaMaquina}Ordenador.png`

    console.log(jugadaMaquina)

    const jugadaJugador = opcionSeleccionada(imagenes)
    const resultado = resultadoJugada(jugadaJugador, jugadaMaquina, posibilidades)
    var elementoLista = document.createElement('li')

    if (resultado === "gana") {
        elementoLista.textContent = `Gana ${nombreJugador.value}`
        historial.appendChild(elementoLista)
      } else if (resultado === "pierde") {
        elementoLista.textContent = `Gana la máquina`
        historial.appendChild(elementoLista)
      } else {
        elementoLista.textContent = `Empate`
        historial.appendChild(elementoLista)
      }

    partidasJugadas++
    spanActual.textContent = partidasJugadas
})

function opcionSeleccionada(imagenes)
{
    for (let i = 0; i < imagenes.length; i++)
    {
        if(imagenes[i].classList.contains('seleccionado'))
        {
            return posibilidades[i]
        }
    }
}

function resultadoJugada(jugador, maquina, posibilidades) 
{
    const posicionJugador = posibilidades.indexOf(jugador)
    const posicionMaquina = posibilidades.indexOf(maquina)

    if(posicionJugador === 0 && posicionMaquina === posibilidades.length - 1 || (posicionJugador > posicionMaquina))
    {
        return "gana"
    } else if (posicionJugador < posicionMaquina) {
        return "pierde"
    } else {
        return "empate"
    }
}

const botonReset = document.querySelector('div button')

botonReset.addEventListener('click', () => 
{
    nombreJugador.disabled = false
    numeroPartidas.disabled = false
    numeroPartidas.value = 0
    spanActual.textContent = '0'
    spanTotal.textContent = '0'
    imagenMaquina.src = 'img/defecto.png'
    var elementoLista = document.createElement('li')
    elementoLista.textContent = 'Nueva partida'
    historial.appendChild(elementoLista)
})