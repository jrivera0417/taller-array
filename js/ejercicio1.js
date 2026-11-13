let listaNombres = [];
function agregarNombre() {
    let nombre = document.getElementById("nombre").value.trim().toUpperCase();
    if (nombre === "") {
        alert("Ingrese el nombre");
        document.getElementById("nombre").style.backgroundColor="red";
        return;
    }
    else if (listaNombres.includes(nombre)) {
        alert(`El nombre ${nombre} ya está registrado`);
        document.getElementById("nombre").style.backgroundColor="white";
        return;
    }
    else{
        document.getElementById("nombre").style.backgroundColor="white";
        listaNombres.push(nombre);
        document.getElementById("nombre").value = "";
        mostrarNombre();
    }
}
function mostrarNombre() {
    let lista = document.getElementById("lista");
    let cantidad = document.getElementById("cantidad");
    lista.innerHTML = "";
    for (let i = 0; i < listaNombres.length; i++) {
        lista.innerHTML += `<li>${listaNombres[i]}</li>`;
    }
    cantidad.textContent = `Total nombres: ${listaNombres.length}`;
}