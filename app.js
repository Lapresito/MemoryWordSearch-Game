/* ---------------------------------- JUEGO --------------------------------- */
/*
---------------------------------PRIMERAS ENTREGAS---------------------------------

function juego() {
    let player = prompt("Welcome to memory word search, please tell us your name")
    //Saludo y recepcion de nombre
    saludo(player)
    console.log("xD")
    aseguradora(player)



    let arranque = confirm("Did you understood the game and the coords sistem?")

    if (arranque) {
        nivel1()
    } else {
        aseguradora()
    }


}
juego()

function reglas() {
    console.log("Let's explain the rules and the table")
    console.log("Imagine a square with 64 squares inside of it divided proporcionally, like a chess table. ")
    console.log("Every square will have a coord with a caracter and a number like  ' C3 ', ' D4 ' or ' H7 ', etc. The square on the left bottom it's going to be the base square with an asociated coord A1. \nIf you move one square to the right the character will be the next one in order of alphabet, and if you move one square to the top the number will be the next positive integer number. \nMost likely you noticed that the corner squares are ' A8 ' that is the right top square,' H8 ' the left top square, ' H1 ' the left bottom square and the base square. \nHave a look at the table and remember the coords.")
    console.log(" (4)| A4 | B4 | C4 | D4 | \n ------------------------ \n (3)| A3 | B3 | C3 | D3 | \n ------------------------ \n (2)| A2 | B2 | C2 | D2 | \n ------------------------ \n (1)| A1 | B1 | C1 | D1 | \n ------------------------ \n (K)| a) | b) | c) | d) | \nK refers to coords (K=coords) \nTry to remember the coords to latter use it for the founded word.")
}

function saludo(player) {
    alert(`${player} please press in your keyboard F12 and open the console to play the game`)
}

function nivel1() {
    console.clear()
    console.log("Welcome to LVL 1, the easiest one, you will have to found a lovely animal with 3 characters \n| D | O | G | X |\n| F | U | L | Z |\n| T | W | E | N |\n| B | V | K | P |")
    let respuestas = ["A4", "B4", "C4"]
    let coordUsuario = leerUsuario(respuestas.length)

    // console.log(coordUsuario)
    while (true) {
        if (arreglosSonIguales(coordUsuario, respuestas)) {
            alert("Nice")
            break
        } else {
            alert("Try again")
            coordUsuario = leerUsuario(respuestas.length)
        }

    }
}

function arreglosSonIguales(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if ((arr1[i] !== arr2[i])) {
            console.log("XD")
            return false
        }
    }
    return true

}

function leerUsuario(cantidadLetras) {
    const coords = []
    for (let i = 0; i < cantidadLetras; i++) {
        let coord = prompt("Write the coord of the letter").toUpperCase()
        coords.push(coord)

    }
    return coords
}

function aseguradora(player) {
    let preparacion = confirm(`Did you press F12 and open the console?`)
    console.log("xD")
    if (preparacion) {
        reglas()
        return true

    } else {
        return saludo(player)
    }
}

    ------------------------------------PRIMERAS ENTREGAS-------------------------------------
*/
fetch("mwsdatalvls.json")
    .then(res => res.json())
    .then(data => {
        niveles = data
        startGame()
        document.addEventListener("DOMContentLoaded", () => recuperarNiveles());
    })
    fetch("mwsdataavs.json")
    .then(res => res.json())
    .then(data => {
        avatars = data
    })
let niveles
let avatars

function startGame() {
    levelMaker(niveles)
}
let nivelActivo = null
let nivelesPasados = []
let columns = ['columnA', 'columnB', 'columnC', 'columnD', 'columnE', 'columnF', 'columnG', 'columnH']

const btmNiveles = []

function levelMaker(arr) {
    for (let i = 0; i < arr.length; i++) {
        const btmLvl = document.querySelector(`.nivel${i + 1}`)
        btmLvl.addEventListener("click", () => crearNivel(i))
        btmNiveles.push(btmLvl)
        console.log(btmNiveles)
    }
}

const lvlStart = document.querySelector(".respuestas1")
lvlStart.addEventListener("click", () => hideTable())

const btmRules = document.querySelector(".openRules")
btmRules.addEventListener("click", () => desplegarRules())
const btmRulesOk = document.querySelector(".rulesOk")
btmRulesOk.addEventListener("click", () => ocultarRules())


function randomLetter(num) {
    const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const abecedarioLength = abecedario.length;
    let result = "";
    for (let i = 0; i < num; i++) {
        result += abecedario[Math.floor(Math.random() * abecedarioLength)];
    }
    return result;
}

function desplegarRules() {
    let rulesOn = document.querySelector(".rules")
    rulesOn.style.display = 'flex'
}

function ocultarRules() {
    let rulesOn = document.querySelector(".rules")
    rulesOn.style.display = 'none'
}


function crearNivel(lvlindex) {
    let btmCheckit = document.querySelector(".checkit")
    btmCheckit.style.display = 'flex'
    let table = document.querySelector(".tablero")
    table.style.display = 'flex'
    let rulesOf = document.querySelector('.rules')
    rulesOf.style.display = 'none'
    const lvl = niveles[lvlindex]
    for (let i = 0; i < 7; i++) {
        document.getElementById(`coord${i}`).style.display = 'none';
    }
    //crear tablero
    for (let i = 0; i < 8; i++) {
        columnCreator(columns[i], lvl)
    }

    const lvlTitle = document.querySelector(".lvlTitle")
    lvlTitle.textContent = lvl.nombre
    const lvlExplanation = document.querySelector(".lvlExplanation")
    lvlExplanation.textContent = lvl.idea
    const respuestas = document.querySelector(lvl.formClass)
    respuestas.style.display = 'inline-block'

    for (let i = 0; i < lvl.answers.length; i++) {
        document.getElementById(`coord${i}`).style.display = 'block';
    }

    nivelActivo = lvlindex
    console.log(nivelActivo)
}


function checkearLvl() {
    let btmPasado = btmNiveles[nivelActivo]
    const datos = obtenerDatos()
    console.log(nivelActivo)
    console.log(niveles[nivelActivo])
    if (arreglosSonIguales(datos, niveles[nivelActivo].answers)) {
        nivelesPasados.push(nivelActivo)
        console.log(nivelesPasados)
        btmPasado.style.color = "white"
        btmPasado.style.background = "rgba(31, 104, 213, 0.775)"
        localStorage.setItem("passedLvls", JSON.stringify(nivelesPasados))
        console.log(nivelActivo)
        console.log(niveles.length)
        if (nivelActivo == niveles.length - 1) {
            console.log(nivelActivo)
            let ganador = document.querySelector('.ganaste')
            ganador.style.display = 'flex'

        } else {
            crearNivel(nivelActivo + 1)
            Swal.fire({
                title: 'Congratulations!',
                text: 'You passed the level succesfully',
                imageUrl: `https://cdn.trophystore.co.uk/Img/Dynamic/Product/61031-636911146227176118.jpg`,
                imageWidth: 150,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
        }

    }
}


function obtenerDatos() {
    const x0 = document.getElementById("coord0").value;
    const x1 = document.getElementById("coord1").value;
    const x2 = document.getElementById("coord2").value;
    const x3 = document.getElementById("coord3").value;
    const x4 = document.getElementById("coord4").value;
    const x5 = document.getElementById("coord5").value;
    const x6 = document.getElementById("coord6").value;


    const r = [x0, x1, x2, x3, x4, x5, x6].map(x => x.toUpperCase());
    const s = r.filter(x => x != '')
    console.log(s)
    return s

}


function hideTable() {
    console.log("sellamo")
    let table = document.querySelector(".tablero")
    table.style.display = 'none'
}

function arreglosSonIguales(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if ((arr1[i] !== arr2[i])) {
            console.log("XD")
            return false
        }
    }
    return true
}

function recuperarNiveles() {
    if (localStorage.getItem("passedLvls") !== null) {

        nivelesPasados = JSON.parse(localStorage.getItem("passedLvls"))

        for (let i = 0; i < nivelesPasados.length; i++) {
            btmNiveles[nivelesPasados[i]].style.color = "white"
            btmNiveles[nivelesPasados[i]].style.background = "rgba(31, 104, 213, 0.775)"
        }

    }
}


function columnCreator(column, nivelActual) {
    let container = document.querySelector(`.${column}`)
    for (i = 1; i <= 8; i++) {
        let div = document.createElement('div');
        console.log(column[6])
        div.classList.add(column[6] + i);
        container.appendChild(div)
        container.style.display.flexdirection = "column"
        container.style.margin = "8px"
    }
    for (i = 1; i <= 8; i++) {
        let coord = document.querySelector(`.${column[6]}${i}`)
        let coordCeldaActual = column[6] + i
        console.log(nivelActual.answers.includes(coordCeldaActual))
        if (nivelActual.answers.includes(coordCeldaActual)) {
            coord.textContent = nivelActual.answersLetter[nivelActual.answers.indexOf(coordCeldaActual)]
        } else
            coord.textContent = randomLetter(1)
    }
    //...
}

let avatarSelected = null
let playerNick = null

let btmChrSelect = document.querySelector(".characterSelect")
btmChrSelect.addEventListener("click", () => desplegarChrSelection())

function desplegarChrSelection() {
    setUpClickAvatar(avatars)
    let chrs = document.querySelector(".characters")
    chrs.style.display = 'flex';

    let playerNickname = document.querySelector(".nameOfCharacher")
    getNick()
}
let btmSave = document.querySelector(".save")
btmSave.addEventListener("click", () => ocultarChrSelection())


function setUpClickAvatar(avs) {
    for (let i = 0; i < avs.length; i++) {
        let btmAvSelect = document.querySelector(`.imgAv${i + 1}`)
        btmAvSelect.addEventListener("dblclick", () => {
            avatarSelected = avs[i];
            console.log(avatarSelected)
        })
        
    }
}
function getNick() {

    playerNick = document.getElementById("nameChr").value;
    console.log(playerNick)
    return playerNick
}

function ocultarChrSelection() {
    getNick()
    let chrs = document.querySelector(".characters")
    chrs.style.display = 'none';
}
// let btmAv2Select = document.querySelector(".imgAv2")
// btmAv2Select.addEventListener("click", () => saveAvatar())
// let btmAv3Select = document.querySelector(".imgAv3")
// btmAv3Select.addEventListener("click", () => saveAvatar())