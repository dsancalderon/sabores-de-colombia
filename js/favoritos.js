// Arreglo global de favoritos (se carga del localStorage si existe)
let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

// Función para añadir o quitar de favoritos
function toggleFavorito(id) {
    const index = favoritos.indexOf(id);

    if (index === -1) {
        // No está, lo agregamos
        favoritos.push(id);
    } else {
        // Ya está, lo quitamos
        favoritos.splice(index, 1);
    }

    // Guardamos en la memoria del navegador
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
    
    // Actualizamos la interfaz en tiempo real
    actualizarContador();
    actualizarBotonesFav();
}

// Función para actualizar el número en el Header
function actualizarContador() {
    const contador = document.getElementById('fav-count');
    if (contador) {
        contador.textContent = favoritos.length;
    }
}

// Función para que los corazones cambien de color si ya son favoritos
function actualizarBotonesFav() {
    // Buscamos todos los botones que tengan la clase 'fav-btn'
    const botones = document.querySelectorAll('.fav-btn');
    botones.forEach(btn => {
        // Extraemos el ID que le pusimos al botón al crearlo
        const id = parseInt(btn.getAttribute('data-id'));
        if (favoritos.includes(id)) {
            btn.innerHTML = '❤️'; // Corazón lleno
            btn.classList.add('active');
        } else {
            btn.innerHTML = '🤍'; // Corazón vacío
            btn.classList.remove('active');
        }
    });
}

// Al cargar cualquier página, actualizamos el contador
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    // Damos un pequeño tiempo para que el JS de las recetas termine de dibujar las cards
    setTimeout(actualizarBotonesFav, 100); 
});