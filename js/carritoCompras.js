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

// Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
let elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

// Ejecución de funciones

cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();


// Definiciones de funciones


// Traer datos del data.json

const traerDatos = async () => {
    try {
        const response = await fetch ("../data.json");
        const data = await response.json();

        data.forEach (producto => {
            let {id, nombre, precio, foto, descripcion} = producto;
            // productos.push (producto);
            productos.push (new Producto (id, nombre, precio, foto, descripcion));     
            
            dibujarCatalogoProductos();
        });

    }catch (error) {
        const div = document.getElementById ("errorFetch")
        const p = document.createElement ("p")
        p.innerhtml = `<p> Ups... Algo salió mal </p>`

        div.append (p); 
    }
};
traerDatos ();

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
                elementosCarrito = JSON.parse(localStorage.getItem("elementosCarrito"));
                let indiceEliminar =  elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar,1);
                localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
                
                dibujarCarrito();
            });
        }
    );

    const valorInicial = 0;
    const totalCompora = elementosCarrito.reduce(
        (previousValue, currentValue) => previousValue + currentValue.producto.precio*currentValue.cantidad,
        valorInicial
    );

    elementosCarrito.length == 0 ? contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>` : contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: $${totalCompora}</th>`;
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
            localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
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

// FINALIZAR COMPRA 
let botonFinalizar = document.getElementById ("formularioHabitaciones");
let datosReserva = [];


let contenedor = document.getElementById ("reviseDatos");

botonFinalizar.addEventListener ("submit", (e) => {
    e.preventDefault ();

    const agregarStorage = (nombreApellido, email, telefono, cantidadHuesped, fechaInicio, fechaSalida) => {
        let datosContacto = [];

        localStorage.getItem('datosReserva') ? datosContacto = JSON.parse(localStorage.getItem("datosReserva")) : localStorage.setItem('datosReserva', JSON.stringify(datosContacto));

        let info = {
            nombreApellido: nombreApellido,
            email: email,
            telefono: telefono,
            cantidadHuesped: cantidadHuesped,
            fechaInicio: fechaInicio,
            fechaSalida: fechaSalida
        };

        datosContacto.push(info);
        localStorage.setItem("datosReserva", JSON.stringify(datosContacto));
    }

    console.log(elementosCarrito)

    let nombreHuesped = document.getElementById ("inputNombreApellido").value;
    let emailHuesped = document.getElementById ("inputEmailHabitacion").value;
    let telefonoHuesped = document.getElementById ("inputTelefonoHabitacion").value;
    let cantidadHuesped = document.getElementById ("inputCantidadHuesped").value;
    let fechaInicio = document.getElementById ("fechaInicio").value;
    let fechaSalida = document.getElementById ("fechaSalida").value;

    localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
    let idHabitaciones = JSON.parse(localStorage.getItem("elementosCarrito"));
    let longitudArray = idHabitaciones.length;
    console.log(longitudArray)

    if (idHabitaciones != 0 && nombreHuesped !== "" && emailHuesped !== "" && telefonoHuesped !== "" && cantidadHuesped <= 4 && cantidadHuesped > 0) {
        agregarStorage (nombreHuesped, emailHuesped, telefonoHuesped, cantidadHuesped, fechaInicio, fechaSalida);

        swal({
            title: 'Compra realizada con éxito!',
            icon: 'success',
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false,
                    color: "#769FCD"
                }
            }
        });
        contenedor.innerHTML = "";
        localStorage.removeItem("elementosCarrito");
    } 
    else if(idHabitaciones == 0 && nombreHuesped !== "" && emailHuesped !== "" && telefonoHuesped !== "" && cantidadHuesped !== ""){
        contenedor.innerHTML = "<h2> * Debe agregar al menos un elemento al carrito! </h2>";
    }

    else if (idHabitaciones != 0 && (nombreHuesped == "" || emailHuesped == "" || telefonoHuesped == "" || cantidadHuesped == "")) {
        contenedor.innerHTML = "<h2> * Falta completar datos! </h2>";

    } else if (idHabitaciones != 0 && nombreHuesped !== "" && emailHuesped !== "" && telefonoHuesped !== "" && cantidadHuesped > 4) {
        contenedor.innerHTML = "<h2> * No deben ser más de 4 huéspedes! </h2>";
    }
    else if(idHabitaciones == 0  && nombreHuesped == "" && emailHuesped == "" && telefonoHuesped == "" && cantidadHuesped == ""){
        contenedor.innerHTML = "<h2> * No hay elementos agregados al carrito y falta completar los datos! </h2>";
    }
})