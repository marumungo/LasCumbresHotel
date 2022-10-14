// FORMULARIO

let botonEnviar = document.getElementById ("formulario");

let datosContacto = [];

botonEnviar.addEventListener ("submit", (e) => {
    e.preventDefault ();

    const agregarStorage = (nombre, apellido, email, telefono, texto) => {
        localStorage.getItem('datosContacto') ? datosContacto = JSON.parse(localStorage.getItem("datosContacto")) : localStorage.setItem('datosContacto', JSON.stringify(datosContacto));

        let info = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            texto: texto
        };

        datosContacto.push(info);
        localStorage.setItem("datosContacto", JSON.stringify(datosContacto));
    }

    let nombre = document.getElementById ("inputNombre").value;
    let apellido = document.getElementById ("inputApellido").value;
    let email = document.getElementById ("inputEmail").value;
    let telefono = document.getElementById ("inputTelefono").value;
    let texto = document.getElementById ("inputTexto").value;

    if (nombre === "" || apellido === "" || email === "" || telefono === "" || texto === "") {
        let contenedor = document.getElementById ("reviseDatos");
        contenedor.innerHTML = "";
        let div = document.createElement ("div");
        div.innerHTML = "<h2> * Revise los datos ingresados </h2>";
        contenedor.append (div);
    }else {
        agregarStorage (nombre, apellido, email, telefono, texto);

        let contenedor = document.getElementById ("datosEnviados");
        contenedor.innerHTML = "";
        let div = document.createElement ("div");
        div.innerHTML = "<h2> Los datos fueron enviados con éxito! </h2>";
        contenedor.append (div);
    }
})