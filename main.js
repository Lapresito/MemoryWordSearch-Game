/* ------- Primer entrega JS (Funcion y ciclos, algoritmo interactivo) ------ */
const producto1 = new Producto("hojillas", 300, 250, 01, false)
const producto2 = new Producto("grinder", 400, 350, 02, true)
const producto3 = new Producto("bong", 700, 650, 03, true)
const producto4 = new Producto("lighter", 100, 50, 04, false)

const productosDisponibles = [producto1 , producto2, producto3, producto4]


function shop() {
    solicitarNombre()
    filtroF()
}
shop()



function solicitarNombre() {
    let nombreUsuario = prompt("Hola, bienvenido, Cual es tu nombre?")
    alert(`Como estas ${nombreUsuario}, a continuacion podras elejir un producto y visualizar sus precios`)
}



function filtroF() {
    let filtro = prompt(`Es usted es socio?
Si 
No`)

    if (filtro == "Si" || filtro == "SI" || filtro == "si") {
        alert(`Perfecto! podra acceder al descuento de socio.`)
        seleccionSocioF();
    } else if (filtro == "No" || filtro == "NO" || filtro == "no") {
        seleccionF();
    } else {
        alert("Porfavor responda nuevamente la pregunta.")
        filtroF();
    }
}



function seleccionSocioF() {
    let flag = true
    let carrito = []
    alert(`Elija un numero para seleccionar su producto`)
    while (flag) {
        let seleccionS = Number(prompt(`
    1.Hojillas
    2.Grinder
    3.Bong
    4.Lighter
    5.Ver Carrito
    6.Busqueda de ofertas
    0.Salir del Menu`))
        switch (seleccionS) {
            case 1:
                let eleccion1 = Number(prompt(`El precio de las Hojillas es: ${producto1.calculoIva()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion1 == 1) {
                    carrito.push(`${producto1.nombre} de ${producto1.calculoIvaSocio()} USD.`)
                } else {
                    alert("Porfavor responda la pregunta")
                    eleccion1;
                }
                break;
            case 2:
                let eleccion2 = Number(prompt(`El precio del Grinder es: ${producto2.calculoIvaSocio()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion2 == 1) {
                    carrito.push(`${producto2.nombre} de ${producto2.calculoIvaSocio()} USD.`)
                } else {}
                break;

            case 3:
                let eleccion3 = Number(prompt(`El precio del Bong es: ${producto3.calculoIvaSocio()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion3 == 1) {
                    carrito.push(`${producto3.nombre} de ${producto3.calculoIvaSocio()} USD.`)
                } else {}
                break;
            case 4:
                let eleccion4 = Number(prompt(`El precio del Lighter es: ${producto4.calculoIvaSocio()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion4 == 1) {
                    carrito.push(`${producto4.nombre} de ${producto4.calculoIvaSocio()} USD.`)
                } else {}
                break;
            case 5:
                alert(`Usted tiene en el carrito: ${carrito}`)
                break;
            case 6:
                // let ask = confirm('Desea ver los objetos con oferta de socio?')
                // if(ask){
                    console.log(productosDisponibles)
                    let objetosConSale = productosDisponibles.filter(productoDisponible => productoDisponible.socioSales == true)
                    alert(objetosConSale.map(productoDisponible => productoDisponible.nombre))
                // }
                break;

            case 0:
                flag = false
                break;
            default:
                alert(`Seleccione un numero porfavor.`);
                seleccionSocioF();
                break;
        }
    }
}


function seleccionF() {
    let flag = true
    let carrito = []
    alert(`Elija un numero para seleccionar su producto`)
    while (flag) {
        let seleccion = Number(prompt(`
    1.Hojillas
    2.Grinder
    3.Bong
    4.Lighter
    5.Ver Carrito
    0.Salir del Menu`))
        switch (seleccion) {
            case 1:
                let eleccion1 = Number(prompt(`El precio de las Hojillas es: ${producto1.calculoIva()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion1 == 1) {
                    carrito.push(`${producto1.nombre} de ${producto1.calculoIva()} USD.`)
                } else {}
                break;
            case 2:
                let eleccion2 = Number(prompt(`El precio del Grinder es: ${producto2.calculoIva()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion2 == 1) {
                    carrito.push(`${producto2.nombre} de ${producto2.calculoIva()} USD.`)
                } else {}
                break;

            case 3:
                let eleccion3 = Number(prompt(`El precio del Bong es: ${producto3.calculoIva()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion3 == 1) {
                    carrito.push(`${producto3.nombre} de ${producto3.calculoIva()} USD.`)
                } else {}
                break;
            case 4:
                let eleccion4 = Number(prompt(`El precio del Lighter es: ${producto4.calculoIva()}
                Quiere agregarlo al carrito?
                1.Si
                2.No`));
                if (eleccion4 == 1) {
                    carrito.push(`${producto4.nombre} de ${producto4.calculoIva()} USD.`)
                } else {}
                break;
            case 5:
                alert(`Usted tiene en el carrito: ${carrito}`)
                break;
            case 0:
                flag = false
                break;
            default:
                alert(`Seleccione un numero porfavor.`);
                seleccionF();
                break;
        }
    }
}

function Producto(nombre, precio, precioSocio, id, socioSales) {
    this.nombre = nombre;
    this.precio = precio;
    this.precioSocio = precioSocio;
    this.id = id;
    this.socioSales = socioSales;
    this.calculoIva = function () {
        return this.precio * 1.2
    }
    this.calculoIvaSocio = function () {
        return this.precioSocio * 1.2
    }
}