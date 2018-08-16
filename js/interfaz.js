class Interfaz {
    constructor() {
        // Inicia la app al instanciar
        this.init();
        // Leer el resultado Se muestra los resultados de la REST API
        this.listado = document.querySelector('#resultado-eventos');
    }

    // Metodo para cuando inicie la app
    init(){
        // lamar a imprimir categorias de la rest api
        this.imprimirCategorias();
    }

    // Imprimir categorias
    imprimirCategorias(){
        const listaCategorias = eventBrite.obtenerCategorias()
            .then(categorias => {
                console.log(categorias);
                const cats = categorias.categorias.categories;
                // Seleccionar el select de categorias
                const categoriasSelect = document.querySelector('#listado-categorias');
                // Recorremos el arreglo y le agregamos los <option>
                console.log(cats);
                cats.forEach((cat) => {
                    const optionCategorias = document.createElement('option');
                    optionCategorias.value = cat.id;
                    optionCategorias.innerText = cat.name;
                    categoriasSelect.appendChild(optionCategorias);
                });
            })

    }

    // Metodo para imprimer mensajes
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.classList = clases;
        div.innerText = mensaje;
        // Buscar un padre
        const buscadorDiv = document.querySelector('#buscador');
        buscadorDiv.appendChild(div);
        // Quitar el alert despues de 1 seg
        setTimeout(() => {
            this.limpiarMensaje();
        },3000);
        // Desaparece mensjae en caso de que exista
        // setTimeout(() => {
        //     div.remove();
        // },1000);
    }

    // Desaparece mensjae en caso de que exista
    limpiarMensaje(){
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }

    // Lee la respuesta de la api e imprime los resultas
    mostrarEventos(eventos){
        // Recorrer los eventos y mostrar su template
        eventos.forEach((evento) => {
            console.log(evento);
            this.listado.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${evento.logo !== null ? evento.logo.original.url : ''}"  class="img-fluid mb-2">
                            <div class="card-body">
                                <div class="card-text">
                                    <h2 class="text-center">${evento.name.text}</h2>
                                    <p class="lead text-info">Informacion del evento:</p>
                                    <p>${evento.description.text !== null ? evento.description.text.substring(0,280) : 'No hay informacion'}...</p>
                                    <span class="badge badge-primary">Capacidad: ${evento.capacity !== null ? evento.capacity : 'No definido'}</span>
                                    <span class="badge badge-secondary">Fecha y hora: ${evento.start.local !== null ? evento.start.local : 'No definido'}</span>
                                    <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">Comprar boletos</a>
                                </div>
                            </div>

                        </div>
                    </div>
            `;
        });
    }

    limpiarEventosPrevios(){
        this.listado.innerHTML = '';
    }

}
