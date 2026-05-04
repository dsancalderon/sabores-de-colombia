// Busca esta parte en tu js/app.js y actualízala
async function cargarRecetas() {
    const contenedorHome = document.getElementById('contenedor-destacados');
    const contenedorServicios = document.getElementById('contenedor-recetas');
    const contenedorFavoritos = document.getElementById('contenedor-favoritos-lista'); // Nuevo
    
    if (!contenedorHome && !contenedorServicios && !contenedorFavoritos) return;

    try {
        const respuesta = await fetch('data/recetas.json');
        const datos = await respuesta.json();
        
        let recetasAMostrar = [];
        const contenedor = contenedorHome || contenedorServicios || contenedorFavoritos;

        if (contenedorHome) {
            recetasAMostrar = datos.slice(0, 3);
        } else if (contenedorServicios) {
            recetasAMostrar = datos;
        } else if (contenedorFavoritos) {
            // FILTRAR: Solo las recetas cuyos IDs estén en el array de favoritos
            const idsFavoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
            recetasAMostrar = datos.filter(r => idsFavoritos.includes(r.id));
            
            if (recetasAMostrar.length === 0) {
                contenedor.innerHTML = '<p>No has guardado ninguna receta todavía. ¡Explora y dales amor!</p>';
                return;
            }
        }

        contenedor.innerHTML = '';

        recetasAMostrar.forEach(receta => {

            // 1. Obtenemos los favoritos actuales del localStorage
                const favoritosActuales = JSON.parse(localStorage.getItem('misFavoritos')) || [];

            // 2. Verificamos si esta receta específica ya es favorita
                const esFavorito = favoritosActuales.includes(receta.id);

            // 3. Definimos el icono (corazón rojo si es favorito, gris/vacío si no)
                const iconoCorazon = esFavorito ? '❤️' : '🤍';
                const claseActiva = esFavorito ? 'active' : '';

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${receta.imagen}" alt="${receta.nombre}">
                <div class="card-body">
                    <small>${receta.categoria}</small>
                    <h4>${receta.nombre}</h4>
                    <p>${receta.descripcion}</p>
                    <div class="card-footer">
                        <a href="detalle.html?id=${receta.id}" class="btn-primary">Ver Detalles</a>
                        <button class="fav-btn" data-id="${receta.id}" onclick="manejarClicFavorito(${receta.id})">❤️</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Nueva función para que si se quita de la lista de favoritos, la página se refresque
function manejarClicFavorito(id) {
    toggleFavorito(id); // La función que ya teníamos en favoritos.js
    
    // Si estamos en la página de favoritos, volvemos a cargar para que desaparezca el que quitamos
    if (document.getElementById('contenedor-favoritos-lista')) {
        cargarRecetas();
    }
}

document.addEventListener('DOMContentLoaded', cargarRecetas);