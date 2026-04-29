async function cargarDetalle() {
    const contenedor = document.getElementById('detalle-receta');
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    try {
        const res = await fetch('data/recetas.json');
        const recetas = await res.json();

        const receta = recetas.find(r => r.id === id);

        if (!receta) {
            contenedor.innerHTML = "<p>Receta no encontrada</p>";
            return;
        }

        contenedor.innerHTML = `
            <div class="detalle-container">
                
                <div class="detalle-info">
                    <span class="badge">${receta.categoria}</span>
                    <h2>${receta.nombre}</h2>
                    <p class="descripcion">${receta.descripcion}</p>

                    <div class="detalle-extra">
                        <p><strong>⏱ Tiempo:</strong> 10 minutos</p>
                        <p><strong>🍽 Porciones:</strong> 4 personas</p>
                    </div>

                    <div class="detalle-botones">
                        <button class="btn btn-print">
                            <i class="fas fa-print"></i> Imprimir
                        </button>

                        <button class="btn btn-share">
                            <i class="fas fa-share-alt"></i> Compartir
                        </button>
                    </div>
                </div>

                <div class="detalle-img">
                    <img src="${receta.imagen}" alt="${receta.nombre}">
                </div>

            </div>
        `;
    } catch (error) {
        console.error("Error cargando detalle:", error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDetalle);
// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', cargarDetalle);