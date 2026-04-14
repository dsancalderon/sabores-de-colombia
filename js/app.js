async function cargarRecetas() {
    // Intentamos buscar el contenedor del Home O el de la página de servicios
    const contenedorHome = document.getElementById('contenedor-destacados');
    const contenedorServicios = document.getElementById('contenedor-recetas');
    
    // Si no hay ninguno de los dos, no hacemos nada
    if (!contenedorHome && !contenedorServicios) return;

    try {
        const respuesta = await fetch('data/recetas.json');
        const datos = await respuesta.json();
        
        // Decidimos qué contenedor usar y cuántos datos mostrar
        const contenedor = contenedorHome || contenedorServicios;
        const recetasAMostrar = contenedorHome ? datos.slice(0, 3) : datos;

        contenedor.innerHTML = '';

        recetasAMostrar.forEach(receta => {
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
                        <button class="fav-btn" onclick="toggleFavorito(${receta.id})">❤️</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

document.addEventListener('DOMContentLoaded', cargarRecetas);