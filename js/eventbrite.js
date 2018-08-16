class EventBrite {
    constructor() {
        this.tokenOAuth = 'NZZPOYYFZYFEG2WBE7GL';
        this.ordenar = 'date';
    }
    // Obtiene las categorias en el init
    async obtenerCategorias(){
        // Consultar las categorias a la REST API de event brite
        const responseCategorias = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.tokenOAuth}`);
        // Esperar la respuesta de las categorias y devolver un JSON
        console.log(responseCategorias);
        const categorias = await responseCategorias.json();
        console.log(categorias);
        // Devolvemos el resultado
        return{
            categorias
        }
    }

    // Mostrar resultado de la busqueda
    async obtenerEventos(busqueda, tipoEvento){

        const responseEvento = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${busqueda}&sort_by=${this.ordenar}&categories=${tipoEvento}&token=${this.tokenOAuth}`);
        console.log(responseEvento);
        // Esperar la respuesta del evento y devolverlo como json
        const dataEventos = await responseEvento.json();
        return {
            dataEventos
        };
    }

}
