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

                        <button id="btnCompartir" class="btn btn-copy-link">
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

    // Usamos el 'document' para escuchar los clics en toda la página
// Esto asegura que detecte el botón incluso si se creó dinámicamente

}

document.addEventListener('click', (event) => {
    
    // 1. ABRIR MODAL: Verificamos si lo que se clickeó fue el botón de compartir (o su ícono interno)
    const botonCompartir = event.target.closest('#btnCompartir');
    
    if (botonCompartir) {
        const modalCompartir = document.getElementById('modalCompartir');
        const urlRecetaInput = document.getElementById('urlReceta');
        const btnCopiar = document.getElementById('btnCopiar');
        const mensajeCopiado = document.getElementById('mensajeCopiado');

        if (modalCompartir) {
            modalCompartir.classList.remove('modal-oculto');
            modalCompartir.classList.add('modal-activo');
            
            // Obtenemos la URL actual
            urlRecetaInput.value = window.location.href; 
            
            // Reiniciamos textos
            btnCopiar.textContent = 'Copiar';
            mensajeCopiado.style.display = 'none';
        }
    }

    // 2. CERRAR MODAL (con la X)
    const btnCerrarModal = event.target.closest('#btnCerrarModal');
    if (btnCerrarModal) {
        const modalCompartir = document.getElementById('modalCompartir');
        modalCompartir.classList.remove('modal-activo');
        modalCompartir.classList.add('modal-oculto');
    }

    // 3. CERRAR MODAL (clic afuera)
    const modalCompartir = document.getElementById('modalCompartir');
    if (event.target === modalCompartir) {
        modalCompartir.classList.remove('modal-activo');
        modalCompartir.classList.add('modal-oculto');
    }

    // 4. COPIAR AL PORTAPAPELES
    const btnCopiar = event.target.closest('#btnCopiar');
    if (btnCopiar) {
        const urlRecetaInput = document.getElementById('urlReceta');
        const mensajeCopiado = document.getElementById('mensajeCopiado');
        
        navigator.clipboard.writeText(urlRecetaInput.value)
            .then(() => {
                mensajeCopiado.style.display = 'block';
                btnCopiar.textContent = '¡Listo!';
                
                setTimeout(() => {
                    mensajeCopiado.style.display = 'none';
                    btnCopiar.textContent = 'Copiar';
                }, 2500);
            })
            .catch(err => console.error('Error al copiar: ', err));
    }
});

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', cargarDetalle);