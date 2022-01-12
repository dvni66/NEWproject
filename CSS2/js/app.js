const carrito = document.getElementById("carrito");
const perfumes = document.getElementById("lista-perfumes");
const listaPerfumes = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  perfumes.addEventListener("click", comprarPerfume);
  carrito.addEventListener("click", eliminarPerfume);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPerfume(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const perfume = e.target.parentElement.parentElement;
        leerDatosPerfume(perfume);
    }
}

function leerDatosPerfume(perfume){
    const infoPerfume = {
        imagen: perfume.querySelector('img').src,
        titulo: perfume.querySelector('h4').textContent,
        precio: perfume.querySelector('.precio span').textContent,
        id: perfume.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoPerfume);
}

function insertarCarrito(perfume) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${perfume.imagen}" width=100> 
       </td> 
       <td>${perfume.titulo}</td>
       <td>${perfume.precio}</td>
       <td>
        <a href="#" class="borrar-perfume" data-id="${perfume.id}">X</a>
       </td>
    `;
    listaPerfumes.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPerfume(e) {
    e.preventDefault();

    let perfume,
        perfumeId;
    
    if(e.target.classList.contains('borrar-perfume')) {
        e.target.parentElement.parentElement.remove();
        perfume = e.target.parentElement.parentElement;
        perfumeId = perfumeId.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(perfumeId)
}

function vaciarCarrito(){
    while(listaPerfumes.firstChild){
        listaPerfumes.removeChild(listaPerfumes.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPerfumeLocalStorage(perfume) {
    let perfumes;

    perfumes = obtenerPerfumesLocalStorage();
    perfumes.push(perfume);

    localStorage.setItem('perfumes', JSON.stringify(perfumes));
}

function obtenerPerfumesLocalStorage() {
    let perfumesLS;

    if(localStorage.getItem('perfumes') === null) {
        perfumesLS = [];
    }else {
        perfumesLS = JSON.parse(localStorage.getItem('perfumes'));
    }
    return perfumesLS;
}

function leerLocalStorage() {
    let perfumesLS;

    perfumesLS = obtenerPerfumesLocalStorage();

    perfumesLS.forEach(function(perfume){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${perfume.imagen}" width=100>
            </td>
            <td>${perfume.titulo}</td>
            <td>${perfume.precio}</td>
            <td>
                <a href="#" class="borrar-perfume" data-id="${perfume.id}">X</a>
            </td>
        `;
        listaPerfumes.appendChild(row);
    });
}

function eliminarPerfumesLocalStorage(perfume) {
    let perfumesLS;
    perfumesLS = obtenerPerfumesLocalStorage();

    perfumesLS.forEach(function(perfumesLS, index){
        if(perfumesLS.id === perfume) {
            perfumesLS.splice(index, 1);
        }
    });

    localStorage.setItem('perfumes', JSON.stringify(perfumesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
