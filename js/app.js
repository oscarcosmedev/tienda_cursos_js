/**
 * Variables
 */
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = []

/**
 * Listeners
 */
cargarEventListeners()
function cargarEventListeners() {
    
    // Revisamos si el Storage tiene datos del carrito guardados
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        carritoHTML()
    })

    // Agrega curso al "Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina curso del "Carrito"
    carrito.addEventListener('click', eliminarCursoDelCarrito)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // vacia el arreglo del carrito
        limpiarHTML() // Limpia el HTML
        localStorage.clear() // Limpia el Storage
    })

}

/**
 * Funciones
 */

function eliminarCursoDelCarrito(e) {
    // console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID)
        console.log(articulosCarrito)
        
        // Limpia el carrito y vuelve a iterar y mostrar el HTML
        carritoHTML()
    }

}

function agregarCurso(e) {
    e.preventDefault()
    // console.log()
    if(e.target.classList.contains('agregar-carrito')) {
        // console.log('hiciste click en boton')
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

// Leemos datos - HTML del curso seleccionado
function leerDatosCurso(curso){
    // console.log(curso)

    // Creamos un objeto con el contenido del curso actual
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        profesor: curso.querySelector('p').textContent,
        cantidad: 1
    }

    // Revisamos si el curso/item ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
    console.log(existe)

    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++
                return curso // retorna el objeto actualizado
            } else {
                return curso // retorna los objetos que no son duplicados
            }
        })

        articulosCarrito = [...cursos]

    } else {
        // Agrega elementos al arreglo de Carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
        console.log(articulosCarrito)
    }

    carritoHTML()
}


// Muestra el Carrito de comprar en el HTML
function carritoHTML() {

    // Limpiar el HTML previo
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id} = curso

        // console.log(curso)
        
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100' />
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id=${id}> X </a>
            </td>
        `;

        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

    // Agregamos el carrito al Storage
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = ''
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
