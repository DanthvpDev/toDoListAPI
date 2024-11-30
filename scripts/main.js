const contenedorCompletadas = document.getElementById('contenedorCompletadas');
const contenedorPendientes = document.getElementById('contenedorPendientes');
const btnIrPendientes = document.getElementById('btnVerTodoPendientes');
const btnIrCompletado = document.getElementById('btnVerTodoCompletadas');
const btnVerTodoGeneral = document.getElementById('listaCompleta');
const cuerpoTabla = document.getElementById('tableBody');

async function GenerarListaMuestra(contendor, estadoTarea) {
    try {
        //? Guarda la promesa de la función .json() o un null
        let datosAPI;
        (estadoTarea) ?  datosAPI = await ConexionAPI('completed', true) : datosAPI =  await ConexionAPI('completed', false);
        console.log(datosAPI)
        //* * Si no es null
        if (datosAPI) {
            for (let index = 0; index < 2; index++) {
                let li = document.createElement('li');
                li.className += "border-1 border-bottom border-secondary d-flex justify-content-between align-items-center py-0 px-3 g-1";
                li.innerHTML = ` <p class="py-2 m-0 fw-bold">${datosAPI[index].title}</p>
                                 <p class="py-2 m-0 fw-semibold">${datosAPI[index].id}</p>
                            ` ;
                contendor.appendChild(li);
            }
        }
        else {
            contendor.innerHTML = `No hay datos para mostrar <img src="/media/img/angry.png" width="30" height="30">`
        }
    }
    catch (exc) {
        console.log('Ha habido un error: ', exc)
    }

}





btnVerTodoGeneral.addEventListener('click', ()=> {
    GenerarListaCompleta(undefined, undefined, cuerpoTabla)
}, false);

GenerarListaMuestra(contenedorCompletadas, true);
GenerarListaMuestra(contenedorPendientes, false);