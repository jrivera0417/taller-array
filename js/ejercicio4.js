let listaCitas = [];
const tiposMascotaValidos = ["Perro", "Gato", "Conejo"];
const tiposConsultaValidos = ["Cita", "Baño y estética", "Vacunación", "Urgencia"];
document.getElementById("formulario").addEventListener("submit", registrarCita);
function registrarCita(event) {
    event.preventDefault();
    let fecha = document.getElementById("fecha").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let tipoMascota = document.getElementById("tipoMascota").value;
    let raza = document.getElementById("raza").value.trim();
    let edad = document.getElementById("edad").value.trim();
    let tipoConsulta = document.getElementById("tipoConsulta").value;
    let camposFaltantes = [];
    if (fecha === "") camposFaltantes.push("fecha");
    if (nombre === "") camposFaltantes.push("nombre de la mascota");
    if (tipoMascota === "") camposFaltantes.push("tipo de mascota");
    if (raza === "") camposFaltantes.push("raza");
    if (edad === "") camposFaltantes.push("edad");
    if (tipoConsulta === "") camposFaltantes.push("tipo de consulta");
    if (camposFaltantes.length > 0) {
        let mensajeFaltante = `Completa los siguientes campos: ${camposFaltantes.join(", ")}.`;
        mostrarMensaje(mensajeFaltante, true);
        alert("Llena todos los campos requeridos para registrar la cita.");
        return;
    }
    if (!esFechaValida(fecha)) {
        alert("La fecha ingresada no es válida.");
        return;
    }
    if (fecha < obtenerFechaActual()) {
        let mensajeFecha = "La fecha de la cita no puede ser anterior a hoy.";
        mostrarMensaje(mensajeFecha, true);
        alert("La fecha de la cita no puede ser anterior a hoy.");
        return;
    }
    if (!tiposMascotaValidos.includes(tipoMascota)) {
        mostrarMensaje("Selecciona un tipo de mascota válido.", true);
        return;
    }
    if (!tiposConsultaValidos.includes(tipoConsulta)) {
        mostrarMensaje("Selecciona un tipo de consulta válido.", true);
        return;
    }
    let edadNumero = Number(edad);
    if (!Number.isInteger(edadNumero) || edadNumero < 0) {
        mostrarMensaje("La edad debe ser un número entero mayor o igual a cero.", true);
        return;
    }
    let nuevaCita = {
        fecha,
        nombre,
        tipoMascota,
        raza,
        edad: edadNumero,
        tipoConsulta
    };
    listaCitas.push(nuevaCita);
    actualizarTabla();
    document.getElementById("formulario").reset();
    mostrarMensaje("Cita registrada correctamente.", false);
}
function esFechaValida(fecha) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return false;
    }
    let fechaConvertida = new Date(`${fecha}T00:00:00Z`);
    return !Number.isNaN(fechaConvertida.getTime()) &&
        fechaConvertida.toISOString().slice(0, 10) === fecha;
}
function obtenerFechaActual() {
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    let dia = String(fechaActual.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
}
function mostrarMensaje(texto, esError) {
    let mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.setAttribute("role", esError ? "alert" : "status");
    mensaje.style.color = esError ? "var(--coral)" : "var(--green)";
}
function actualizarTabla() {
    let tablaCitas = document.getElementById("tablaCitas");
    tablaCitas.innerHTML = "";
    listaCitas.forEach(cita => {
        const fila = tablaCitas.insertRow();
        [
            cita.fecha,
            cita.nombre,
            cita.tipoMascota,
            cita.raza,
            cita.edad + " años",
            cita.tipoConsulta
        ].forEach(valor => fila.insertCell().textContent = valor);
    });
}