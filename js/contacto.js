document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const estado = document.getElementById('mensaje-estado');

    // EXPRESIÓN REGULAR: Solo letras, espacios y tildes
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Validaciones
    if (nombre.length < 3) {
        estado.textContent = "El nombre debe tener al menos 3 caracteres.";
        estado.className = "error";
        return;
    }

    if (!soloLetras.test(nombre)) {
        estado.textContent = "El nombre solo puede contener letras y espacios.";
        estado.className = "error";
        return;
    }

    // Si pasa las validaciones, procedemos al envío
    estado.textContent = "Enviando mensaje...";
    estado.className = "";

    setTimeout(() => {
        estado.textContent = `¡Gracias ${nombre}! Hemos recibido tu mensaje correctamente.`;
        estado.className = "success";
        document.getElementById('formulario-contacto').reset();
    }, 2000);
});