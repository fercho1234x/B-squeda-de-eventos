const eventBrite = new EventBrite();
const ui = new Interfaz();
const btnEnviar = document.querySelector('#buscarBtn');
// Listener al buscador
btnEnviar.addEventListener('click', e => {
    e.preventDefault();
    const valorBusqueda = document.querySelector('#evento').value;
    const valorCategoria = document.querySelector('#listado-categorias').value;
    // Revisar que tengan datos
    if (valorBusqueda === '' || valorCategoria === '') {
        // Mostar mensaje para que imprima algo
        ui.mostrarMensaje('Faltan datos', 'alert alert-danger mt-4');
    }else {
        // Limpia resultados previos
        ui.limpiarEventosPrevios();
        // Cuando si hay una busqueda
        eventBrite.obtenerEventos(valorBusqueda, valorCategoria)
            .then(eventos => {
                console.log(eventos);
                const totalEventos = (eventos.dataEventos.events);
                if (totalEventos.length !== 0) {
                    // Si hay eventos mostrar el resultado
                    ui.mostrarEventos(totalEventos);
                }else {
                    //No hay eventos enviar una alerta
                    ui.mostrarMensaje(`No hay resultados de: ${valorBusqueda}`, 'alert alert-danger mt-4');
                }
            })
    }

});
