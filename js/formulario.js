// FORMULARIO

// PRIMER INTENTO
// let botonEnviar = document.getElementById ("botonEnviar");

// botonEnviar.addEventListener ("submit", (e) => {
//     e.preventDefault ();

//     const agregarStorage = (nombre, apellido, email, telefono, texto) => {
//         let datosContacto = JSON.parse (localStorage.getItem ("datosContacto"));
//         let info = {
//             nombre: nombre,
//             apellido: apellido,
//             email: email,
//             telefono: telefono,
//             texto: texto
//         };

//         datosContacto.push (info);
//         localStorage.setItem ("datosContacto", JSON.stringify(datosContacto));
//     }

//     let nombre = document.getElementById ("inputNombre").value;
//     let apellido = document.getElementById ("inputApellido").value;
//     let email = document.getElementById ("inputEmail").value;
//     let telefono = document.getElementById ("inputTelefono").value;
//     let texto = document.getElementById ("inputTexto").value;

//     agregarStorage (nombre, apellido, email, telefono, texto);
// })


// SEGUNDO INTENTO
// let botonEnviar = document.getElementById ("botonEnviar");

// botonEnviar.addEventListener ("submit", (e) => {
//     e.preventDefault ();

//     class Datos {
//         constructor (nombre, apellido, email, telefono, texto) {
//             this.nombre = nombre;
//             this.apellido = apellido;
//             this.edad = edad;
//             this.email = email;
//             this.telefono = telefono;
//             this.texto = texto;
//         }
//     }

//     const datosContacto = [];

//     let nombre = document.getElementById ("inputNombre").value;
//     let apellido = document.getElementById ("inputApellido").value;
//     let email = document.getElementById ("inputEmail").value;
//     let telefono = document.getElementById ("inputTelefono").value;
//     let texto = document.getElementById ("inputTexto").value;

//     agregarStorage (nombre, apellido, email, telefono, texto);

//     let obj = new Datos (nombre, apellido, email, telefono, texto);
//     datosContacto.push (obj);

//     localStorage.setItem ("datosContacto", JSON.stringify (datosContacto));
//     let datos = JSON.parse (localStorage.getItem ("datos"));
// })



