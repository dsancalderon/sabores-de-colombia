// Función para cargar y mostrar las recetas en el Home
async function cargarRecetasDestacadas() {
    const contenedor = document.getElementById('contenedor-destacados');
    
    try {
        const respuesta = await fetch('data/recetas.json');
        const datos = await respuesta.json();
        
        // Limpiamos el contenedor (quitamos el "Cargando...")
        contenedor.innerHTML = '';

        // Solo mostraremos las primeras 3 en el Home como "Destacadas"
        datos.slice(0, 3).forEach(receta => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="${receta.imagen}" alt="${receta.nombre}">
                <div class="card-body">
                    <h4>${receta.nombre}</h4>
                    <p>${receta.descripcion}</p>
                    <a href="detalle.html?id=${receta.id}" class="btn-primary">Ver Receta</a>
                    <button onclick="guardarFavorito(${receta.id})" class="btn-secundary">❤️</button>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error cargando las recetas:", error);
        contenedor.innerHTML = '<p>Error al cargar los sabores de Colombia.</p>';
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarRecetasDestacadas);