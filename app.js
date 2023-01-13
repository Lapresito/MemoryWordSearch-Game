/* ---------------------------------- JUEGO --------------------------------- */
/*
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
*/




let nivelActivo = null
const lvl1 = {
    nombre: `Level 1`,
    idea: `Welcome to LVL 1, the easiest one, you will have to found a lovely animal with 3 characters`,
    formClass: ".respuestas1",
    answers: ["A1", "A2", "A3"],
    answersLetter: ['d', 'o', 'g']

}
const lvl2 = {
    nombre: `Level 2`,
    idea: `Welcome to LVL 2, you will have to found a animal who is the king of the jungle with 4 characters`,
    formClass: ".respuestas1",
    answers: ["C1", "C2", "C3", "C4"],
    answersLetter: ['l', 'i', 'o', 'n']

}
const lvl3 = {
    nombre: `Level 3`,
    idea: `Welcome to LVL 3, you will have to found an insect who can carry 50 times his weight with 3 characters`,
    formClass: ".respuestas1",
    answers: ["B1", "B2", "B3"],
    answersLetter: ['a', 'n', 't']

}

const niveles = [lvl1, lvl2, lvl3]
let = nivelesPasados = []

let columns = ['columnA', 'columnB', 'columnC', 'columnD', 'columnE', 'columnF', 'columnG', 'columnH']

function randomLetter(num) {
    const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const abecedarioLength = abecedario.length;
    let result = "";
    for (let i = 0; i < num; i++) {
        result += abecedario[Math.floor(Math.random() * abecedarioLength)];
    }
    return result;
}

console.log(randomLetter(1))

function crearNivel(lvlindex) {
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

    const imagen = document.querySelector(".imgLevel1")
    imagen.style.display = 'block'
    nivelActivo = lvlindex
    console.log(nivelActivo)
}

const btmLvl1 = document.querySelector(".nivel1")
btmLvl1.addEventListener("click", () => crearNivel(0))
const btmLvl2 = document.querySelector(".nivel2")
btmLvl2.addEventListener("click", () => crearNivel(1))
const btmLvl3 = document.querySelector(".nivel3")
btmLvl3.addEventListener("click", () => crearNivel(2))

const btmRules = document.querySelector(".openRules")
btmRules.addEventListener("click", () => desplegarRules())
const btmRulesOk = document.querySelector(".rulesOk")
btmRulesOk.addEventListener("click", () => ocultarRules())
function desplegarRules(){
    let rulesOn = document.querySelector(".rules")
    rulesOn.style.display = 'block'
}
function ocultarRules(){
    let rulesOn = document.querySelector(".rules")
    rulesOn.style.display = 'none'
}

const btmNiveles = [btmLvl1, btmLvl2, btmLvl3]


function checkearLvl() {
    let btmPasado = btmNiveles[nivelActivo]
    const datos = obtenerDatos()
    console.log(nivelActivo)
    console.log(niveles[nivelActivo])
    if (arreglosSonIguales(datos, niveles[nivelActivo].answers)) {
        nivelesPasados.push(nivelActivo)
        console.log(nivelesPasados)
        btmPasado.style.color = "green"
        btmPasado.style.background = "red"
        localStorage.setItem("passedLvls", JSON.stringify(nivelesPasados))
        if (nivelActivo == niveles.length - 1) {
            crearNivel(nivelActivo + 1)
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
            btmNiveles[nivelesPasados[i]].style.color = "green"
            btmNiveles[nivelesPasados[i]].style.background = "red"
        }

    }
}
document.addEventListener("DOMContentLoaded", recuperarNiveles());
// crearNivel(lvl1.nombre, lvl1.idea, lvl1.idea, lvl1.formRespuestas)


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