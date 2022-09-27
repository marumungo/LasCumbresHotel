// CARRITO DE COMPRAS

class Producto {
    constructor(id, nombre, precio, foto, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.descripcion = descripcion;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();

/**
 * Definiciones de funciones
 */

function cargarProductos() {
    productos.push(new Producto(1, "Masajista", 2000, "../../images/serviciosMasajista.jpg", "Contamos con un servicio de masajistas profesionales de 8:00 a 16:00, todos los días"));
    productos.push(new Producto(2, "Gimnasio", 1500, "../../images/serviciosGimnasio.jpg", "Tenemos una sala de máquinas, para que puedas realizar los ejercicios que gustes"));
    productos.push(new Producto(3, "Sauna", 4000, "../../images/serviciosSauna.jpg", "Poseemos un sauna en nuestro último piso, que está habilitado las 24 horas del día"));
    productos.push(new Producto(4, "Computadoras", 800, "../../images/serviciosComputadoras.jpg", "Nuestro hotel cuenta con una sala de computadoras, para que utilices en caso de necesitarlas"));
    productos.push(new Producto(5, "Guía turístico", 4000, "../../images/serviciosGuiaTuristico.jpg", "Paquete exclusivo de excursiones (todo pago) por 7 días seguidos, junto con guías especializados"));
    productos.push(new Producto(6, "Restaurante", 8000, "../../images/serviciosRestaurante.jpg", "Cena libre en nuestro restaurante, incluida por 7 días (precio por persona)"));
    productos.push(new Producto(7, "Teatro", 5400, "../../images/serviciosTeatro.jpg", "Obras de teatro incluidas durante una estadía de 7 días (precio por persona)"));
    productos.push(new Producto(8, "Sala de juegos", 3000, "../../images/serviciosSalaDeJuegos.jpg", "Acceso libre a nuestro rincón de juegos, incluyendo ping pong, pool, juegos electrónicos, etc."));
}

function cargarCarrito() {
}

function dibujarCarrito() {
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td class="align-middle">
                    <img src="${elemento.producto.foto}" width=100>
                </td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="4" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td class="total">$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;

                dibujarCarrito();
            });


            //Eliminar producto
            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonEliminarProducto.addEventListener('click', () => {
                let indiceEliminar =  elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar,1);
                
                dibujarCarrito();
            });
        }
    );

    const valorInicial = 0;
    const totalCompora = elementosCarrito.reduce(
        (previousValue, currentValue) => previousValue + currentValue.producto.precio*currentValue.cantidad,
        valorInicial
    );

    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
    } else {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: $${totalCompora}</th>`;
    }
}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <h6>$ ${producto.precio}</h6>
        <p>${producto.descripcion}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    botonAgregar.onclick = () => {
        let elementoExistente = 
            elementosCarrito.find((elem) => elem.producto.id == producto.id);
        
        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal({
            title: '¡Producto agregado!',
            text: `${producto.nombre} agregado al carrito`,
            icon: 'success',
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false,
                    color: "#769FCD"
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((decision) => {
            if(decision) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);
            } else {
                swal("Okay! Sigue comprando");
            }
        });
    }

    return carta;
}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );
}