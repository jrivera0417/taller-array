let listaProductos = [];
function agregarProducto() {
    let producto = document.getElementById("producto").value.trim();
    let precio = parseFloat(document.getElementById("precio").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);
    if (producto === "" || isNaN(precio) || isNaN(cantidad)) {
        alert("Llene todos los campos");
        return;
    }
    listaProductos.push({
        nombre: producto,
        precio: precio,
        cantidad: cantidad
    });
    document.getElementById("formulario").reset();
    mostrar();
}
function mostrar() {
    let tabla = document.getElementById("tabla");
    let total = document.getElementById("total");
    let totalNuevo = 0;
    tabla.innerHTML = "";
    for (let i = 0; i < listaProductos.length; i++) {
        let subtotal = listaProductos[i].precio * listaProductos[i].cantidad;
        tabla.innerHTML += `<tr>
            <td>${listaProductos[i].nombre}</td>
            <td>${listaProductos[i].precio}</td>
            <td>${listaProductos[i].cantidad}</td>
            <td>${subtotal}</td>
        </tr>`;
        totalNuevo += subtotal;            
    }
    total.textContent = `Total: ${totalNuevo}`;
}